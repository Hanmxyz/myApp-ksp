export default class VendorSalesUsecase {
    constructor(vendorSalesRepository) {
        this.vendorSalesRepository = vendorSalesRepository
    }


    async createVendorSale(data) {
        const newData = {
            nip: data.nip,
            totalAmount: data.totalAmount,
            profitKsp: data.profitKsp,
            paymentMetode: data.paymentMetode,
            paymentStatus: data.paymentStatus,
            product : data.product.map ( p => ({
                vendorProductId : p.vendorProductId,
                salePrice : p.salePrice,
                quantity : p.quantity,
                subtotal : parseFloat(p.salePrice * p.quantity)
            })) 
        }
        return await this.vendorSalesRepository.createVendorSale(newData)
    }
}