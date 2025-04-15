export default class PurchasesHandler {
    constructor(purchasesUsecase) {
        this.purchasesUsecase = purchasesUsecase
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