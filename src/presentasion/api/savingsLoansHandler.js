export default class SavingsLoansHandler {
    constructor(savingsLoansUsecase) {
        this.savingsLoansUsecase = savingsLoansUsecase
    }

    async getAllSavingsLoans(req,res) {
        try {
            const data = await this.savingsLoansUsecase.getAllSavingsLoans()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })                
        }
    }

    async getSavingsLoansById(req,res) {
        try {
            const id = req.params.id
            const data = await this.savingsLoansUsecase.getSavingsLoansById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createSavingsLoans(req,res) {
        try {
            const data = req.body
            await this.savingsLoansUsecase.createSavingsLoans(data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateSavingsLoans(req,res) {
        try {
            const year = req.params.id
            const data = req.body
            await this.savingsLoansUsecase.updateSavingsLoans(year, data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteSavingsLoans(req,res) {
        try {
            const year = req.params.id
            await this.savingsLoansUsecase.deleteSavingsLoans(year)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}