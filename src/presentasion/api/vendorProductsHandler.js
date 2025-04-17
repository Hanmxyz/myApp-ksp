export default class VendorProductsHandler {
    constructor(vendorProductsUsecase) {
        this.vendorProductsUsecase = vendorProductsUsecase
    }

    async getAllVendorProducts(req,res) {
        try {
            const data = await this.vendorProductsUsecase.getAllVendorProducts()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getVendorProductById(req,res) {
        try {
            const id = req.params.id
            const data = await this.vendorProductsUsecase.getVendorProductById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createVendorProduct(req,res) {
        try {
            const data = req.body
            await this.vendorProductsUsecase.createVendorProduct(data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateVendorProduct(req,res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.vendorProductsUsecase.updateVendorProduct(id, data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteVendorProduct(req,res) {
        try {
            const id = req.params.id 
            await this.vendorProductsUsecase.deleteVendorProduct(id)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getVendorProductByVendorId(req,res) {
        try {
            const id = req.params.id
            const data = await this.vendorProductsUsecase.getVendorProductByVendorId(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}