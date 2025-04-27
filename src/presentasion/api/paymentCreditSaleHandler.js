export default class PaymentCreditSalesHandler{
    constructor(paymentCreditSalesUsecase){
        this.paymentCreditSalesUsecase = paymentCreditSalesUsecase
    }

    async getAllCreditMemberPerMonth(req,res) {
        try {
            const queryString = req.query
            const data = await this.paymentCreditSalesUsecase.getAllCreditMemberPerMonth(queryString)
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

    async getDetailTransactionCreditMemberPerMonth(req,res) {
        try {
            const nip = req.params.nip
            const queryString = req.query
            const response = await this.paymentCreditSalesUsecase.getDetailTransactionCreditMemberPerMonth(nip, queryString)
            res.json(response)
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

    async updateCreditMemberByNipPerMonth(req,res) {
        try {
            const data = req.body
            const queryString = req.query
            const response = await this.paymentCreditSalesUsecase.updateCreditMemberByNipPerMonth(data, queryString)
            res.json({ message : true , data : response})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}