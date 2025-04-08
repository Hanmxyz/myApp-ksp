export default class VendorsHandler {
    constructor(vendorsUsecase) {
        this.vendorsUsecase = vendorsUsecase
    }

    async getAllVendors(req, res) {
        try {
            const data = await this.vendorsUsecase.getAllVendors()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getVendorById(req, res) {
        try {
            const id = req.params.id
            const data = await this.vendorsUsecase.getVendorById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createVendor(req, res) {
        try {
            const data = req.body
            await this.vendorsUsecase.createVendor(data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateVendor(req, res) {
        try {
            const id = req.params.id
        const data = req.body
        await this.vendorsUsecase.updateVendor(id, data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteVendor(req, res) {
        try {
            const id = req.params.id
            await this.vendorsUsecase.deleteVendor(id)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}