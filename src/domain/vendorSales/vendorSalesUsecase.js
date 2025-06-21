import PaymentVendorSaleRepository from "../../repositories/paymentVendorSaleRepository.js"
import VendorProductsRepository from "../../repositories/vendorProductsRepository.js"
export default class VendorSalesUsecase {
    constructor(vendorSalesRepository) {
        this.vendorSalesRepository = vendorSalesRepository
        this.paymentVendorSaleRepository = new PaymentVendorSaleRepository()
        this.vendorProductsRepository = new VendorProductsRepository()
        
    }


    async getAllVendorSales() {
        return await this.vendorSalesRepository.getAllVendorSales()
    }


    async createVendorSale(data) {
        const date = new Date()
        const isoString = date.toISOString()
        const dateNow = isoString.slice(0,10)
       
        
        const profitKsp = data.product.reduce((acc, curr) => acc + (curr.profitKsp * curr.quantity), 0)
        const newData = {
            nip: data.nip,
            totalAmount: data.totalAmount,
            profitKsp: profitKsp,
            paymentMetode: data.paymentMetode,
            paymentStatus: data.paymentStatus,
            product : data.product.map ( p => ({
                vendorProductId : p.vendorProductId,
                salePrice : p.salePrice,
                quantity : p.quantity,
                profitKsp: p.profitKsp,
                subtotal : parseFloat(p.salePrice * p.quantity)
            })) 
        }

       try {
        for (const item of newData.product) {
            
            const checkVendor = await this.vendorProductsRepository.getVendorProductById(item.vendorProductId)
            
            const checkPaymentVendor = await this.paymentVendorSaleRepository.getVendorPayment(checkVendor.vendorId)
        
            if (!checkPaymentVendor) {
                const data = {
                    vendorId: checkVendor.vendorId,
                    paymentTotal: (checkVendor.sellPrice - checkVendor.profitKsp) * item.quantity
                }
        
                await this.paymentVendorSaleRepository.createPaymentVendorSale(data)
            } else {
                const paymentTotal = checkPaymentVendor.paymentTotal + ((checkVendor.sellPrice - checkVendor.profitKsp) * item.quantity)
                await this.paymentVendorSaleRepository.updateTotalVendorSale(checkVendor.vendorId, paymentTotal)
            }
        }
       } catch (error) {
            return console.log(error.message)
       }


        return await this.vendorSalesRepository.createVendorSale(newData)
    }
}