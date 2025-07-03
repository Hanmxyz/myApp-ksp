export  default class LoansHandler{
    constructor(loansUsecase){
        this.loansUsecase = loansUsecase
    }

    async getAllLoans(req,res) {
        try {
            const data = await this.loansUsecase.getAllLoans()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getLoansById(req,res) {
        try {
            const id = req.params.id
            const data = await this.loansUsecase.getLoansById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createLoan(req,res) {
        try {
            const data = req.body
            const result = await this.loansUsecase.createLoan(data)
            res.json({ message : true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async updateLoan(id, data) {
        try {
            const data = req.body
            const id = req.params.id
            const result = await this.loansUsecase.updateLoan(id,data)
            res.json({ message : true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteLoan(id) {
        try {
            const id = req.params.id
            const result = await this.loansUsecase.deleteLoan(id)
            res.json({ message : true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}