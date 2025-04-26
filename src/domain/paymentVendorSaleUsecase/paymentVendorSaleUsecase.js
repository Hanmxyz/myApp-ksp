export default class PaymentVendorSaleUsecase {
    constructor(paymentVendorSaleRepository) {
        this.paymentVendorSaleRepository = paymentVendorSaleRepository
    }

    async getPaymentVendorSaleWithDetail(vendorId) {
        const paymentVendor = await this.paymentVendorSaleRepository.getVendorPayment(vendorId)
        const vendorProductSales = await this.paymentVendorSaleRepository.getDetailVendorSale()
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
            paymentTotal: paymentVendor.paymentTotal,
            status: paymentVendor.status,
            products: result
        }

        return newData
    }

    async updatePaymentVendorSale(id, data) {
        const dataPayment = await this.paymentVendorSaleRepository.getVendorPayment(id)
        return await this.paymentVendorSaleRepository.updatePaymentVendorSale(dataPayment.id, data)
    }
}