export default class PaymentCreditSalesHandler{
    constructor(paymentCreditSalesUsecase){
        this.paymentCreditSalesUsecase = paymentCreditSalesUsecase
    }

    async getAllCreditMember(req,res) {
        try {
            const data = await this.paymentCreditSalesUsecase.getAllCreditMember()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async getCreditMemberByNip(req,res) {
        try {
            const nip = req.params.nip
            const data = await this.paymentCreditSalesUsecase.getCreditMemberByNip(nip.toString())
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateCreditMember(req,res) {
        try {
            const data = req.body
            const nip = req.params.nip
            const response = await this.paymentCreditSalesUsecase.updateCreditMember(data, nip)
            res.json({ message : true, data : response})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}