export default class LoanRequestHandler {
    constructor(loanRequestUsecase) {
        this.loanRequestUsecase = loanRequestUsecase
    }

    async getAllLoanRequests(req, res) {
        try {
            const data = await this.loanRequestUsecase.getAllLoanRequests()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getLoanRequestById(req, res) {
        try {
            const id = req.params.id
            const data = await this.loanRequestUsecase.getLoanRequestById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createLoanRequest(req, res) {
        try {
            const data = req.body
            const result = await this.loanRequestUsecase.createLoanRequest(data)
            res.json({ message: true, data: result })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateLoanRequestStatus(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            const result = await this.loanRequestUsecase.updateLoanRequestStatus(id, data)
            res.json({ message : true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteLoanRequest(req,res) {
        try {
            const id = req.params.id
            const result = await this.loanRequestUsecase.deleteLoanRequest(id)
            res.json({ message : true, data : result })
        } catch (error) {
            res.status(500).json({ message :  error.message })
        }
    }
}