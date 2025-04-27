export default class PaymentCreditVendorSalesHandler{
    constructor(paymentCreditVendorSalesUsecase){
        this.paymentCreditVendorSalesUsecase = paymentCreditVendorSalesUsecase
    }

    async getAllCreditMember(req,res) {
        try {
            const data = await this.paymentCreditVendorSalesUsecase.getAllCreditMember()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async getAllCreditMemberPerMonth(req,res) {
        try {
            const queryString = req.query
            const data = await this.paymentCreditVendorSalesUsecase.getAllCreditMemberPerMonth(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async getCreditMemberByNip(req,res) {
        try {
            const nip = req.params.nip
            const data = await this.paymentCreditVendorSalesUsecase.getCreditMemberByNip(nip.toString())
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getDetailTransactionCreditMemberPerMonth(req,res) {
        try {
            const nip = req.params.nip
            const queryString = req.query
            const response = await this.paymentCreditVendorSalesUsecase.getDetailTransactionCreditMemberPerMonth(nip, queryString)
            res.json(response)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateCreditMember(req,res) {
        try {
            const data = req.body
            const nip = req.params.nip
            const response = await this.paymentCreditVendorSalesUsecase.updateCreditMember(data, nip)
            res.json({ message : true, data : response})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async updateCreditMemberByNipPerMonth(req,res) {
        try {
            const data = req.body
            const queryString = req.query
            const response = await this.paymentCreditVendorSalesUsecase.updateCreditMemberByNipPerMonth(data, queryString)
            res.json({ message : true , data : response})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}