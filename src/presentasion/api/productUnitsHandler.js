export default class ProductUnitsHandler {
    constructor(productUnitsUsecase) {
        this.productUnitsUsecase = productUnitsUsecase
    }

    async getAllProductUnits(req, res) {
        try {
            const data = await this.productUnitsUsecase.getAllProductUnits()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getProductUnitById(req, res) {
        try {
            const id = req.params.id
            const data = await this.productUnitsUsecase.getProductUnitById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createProductUnit(req, res) {
        try {
            const data = req.body
            await this.productUnitsUsecase.createProductUnit(data)
            res.json({ message: true })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateProductUnit(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.productUnitsUsecase.updateProductUnit(id, data)
            res.json({ message: true })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async deleteProductUnit(req,res) {
        try {
            const id = req.params.id
            await this.productUnitsUsecase.deleteProductUnit(id)
            res.json({ message: true })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}