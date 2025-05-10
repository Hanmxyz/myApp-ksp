import VendorsRepository from "../../repositories/vendorsRepository.js";

export default class PaymentVendorSaleUsecase {
    constructor(paymentVendorSaleRepository) {
        this.paymentVendorSaleRepository = paymentVendorSaleRepository,
            this.vendorsRepository = new VendorsRepository()
    }

    async getPaymentVendorSaleWithDetail(vendorId) {
        console.log(vendorId)
        const vendor = await this.vendorsRepository.getVendorById(vendorId)
        const paymentVendor = await this.paymentVendorSaleRepository.getVendorPayment(vendorId)
        console.log(paymentVendor)
        const vendorProductSales = await this.paymentVendorSaleRepository.getDetailVendorSale()


        if (paymentVendor !== null) {
            const products = vendorProductSales.filter(item => item.vendorProduct.vendorId === paymentVendor.vendorId)
            const result = products.reduce((acc, item) => {
                const vendorProduct = item.vendorProduct;
                const found = acc.find(p => p.vendorProductId === vendorProduct.id);

                if (found) {
                    found.quantity += item.quantity;
                    found.subtotal = found.quantity * found.sellPrice;
                } else {
                    acc.push({
                        vendorProductId: vendorProduct.id,
                        name: vendorProduct.name,
                        category: vendorProduct.categoryId,
                        sellPrice: vendorProduct.sellPrice,
                        quantity: item.quantity,
                        subtotal: vendorProduct.sellPrice * item.quantity
                    });
                }

                return acc;
            }, []);
            const newData = {
                id: paymentVendor.id,
                vendorId: paymentVendor.vendorId,
                name: vendor.name,
                paymentTotal: paymentVendor.paymentTotal,
                status: paymentVendor.status,
                products: result
            }

            return newData
        } else {
            const newData = {
                id: 0,
                vendorId: vendor.id,
                name: vendor.name,
                paymentTotal: 0,
                status: "belum_lunas",
                products: []
            }
            return newData
        }
    }

    async getAllVendorPayment() {
        return await this.paymentVendorSaleRepository.getAllVendorPayment()
    }
    async updatePaymentVendorSale(id, data) {
        const dataPayment = await this.paymentVendorSaleRepository.getVendorPayment(id)
        return await this.paymentVendorSaleRepository.updatePaymentVendorSale(dataPayment.id, data)
    }
}