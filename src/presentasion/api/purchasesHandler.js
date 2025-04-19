export default class PurchasesHandler {
    constructor(purchasesUsecase) {
        this.purchasesUsecase = purchasesUsecase
    }

    async getAllPurchases(req,res) {
        try {
            const data = await this.purchasesUsecase.getAllPurchases()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createPurchase(req, res) {
        try {
            const data = req.body
            await this.purchasesUsecase.createPurchase(data)
            res.json({ message: true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}