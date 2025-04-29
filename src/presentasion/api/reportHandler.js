export default class ReportHandler{
    constructor(reportUsecase){
        this.reportUsecase = reportUsecase
    }

    async getAllSales(req, res) {
        try {
            const queryString = req.query
            const data = await this.reportUsecase.getAllSales(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getAllPurchases(req, res) {
        try {
            const queryString = req.query
            const data = await this.reportUsecase.getAllPurchases(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getAllCredits(req, res) {
        try {
            const queryString = req.query
            const data = await this.reportUsecase.getAllCredits(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getAllVendorSales(req, res) {
        try {
            const queryString = req.query
            const data = await this.reportUsecase.getAllVendorSales(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getAllOperationalCosts(req, res) {
        try {
            const queryString = req.query
            const data = await this.reportUsecase.getAllOperationalCosts(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }


}