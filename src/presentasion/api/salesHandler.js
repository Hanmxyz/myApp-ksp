export default class SalesHandler{
    constructor(salesUsecase) {
        this.salesUsecase = salesUsecase
    }

    async createSale(req, res) {
        try {
            const data = req.body
            await this.salesUsecase.createSale(data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}