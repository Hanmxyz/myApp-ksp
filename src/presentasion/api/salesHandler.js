export default class SalesHandler{
    constructor(salesUsecase) {
        this.salesUsecase = salesUsecase
    }

    async getAllSales(req,res) {
        try {
            const data = await this.salesUsecase.getAllSales()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getDetailSaleBySaleId(req,res) {
        try {
            const id = req.params.id
            const data = await this.salesUsecase.getDetailSaleBySaleId(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createSale(req, res) {
        try {
            const userId = req.user.userId
            const data = req.body
            console.log(data)
            const sale = await this.salesUsecase.createSale(data, userId)
            res.json([{ message : true },
                { data : sale}]
            )
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}