export default class PaymentVendorSaleHandler{
    constructor(paymentVendorSaleUsecase) {
        this.paymentVendorSaleUsecase = paymentVendorSaleUsecase
    }

    async getPaymentVendorSaleWithDetail(req,res) {
        try {
            const id = req.params.id
            const data = await this.paymentVendorSaleUsecase.getPaymentVendorSaleWithDetail(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getAllVendorPayment(req,res) {
        try {
            const data = await this.paymentVendorSaleUsecase.getAllVendorPayment()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updatePaymentVendorSale(req,res){
        try {
            const id = req.params.id
            const  data = req.body
            const response =  await this.paymentVendorSaleUsecase.updatePaymentVendorSale(id,data)
            res.json({ message : true , data : response})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}