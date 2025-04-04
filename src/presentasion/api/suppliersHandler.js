export default class SuppliersHandler {
    constructor(suppliersUsecase) {
        this.suppliersUsecase = suppliersUsecase
    }

    async getAllSuppliers(req,res) {
        try {
            const data = await this.suppliersUsecase.getAllSuppliers()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }   
    }

    async getSupplierById(req,res) {
        try {
            const id = req.params.id
            const data = await this.suppliersUsecase.getSupplierById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async createSupplier(req,res) {
        try {
            const data = req.body
            await this.suppliersUsecase.createSupplier(data)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async updateSupplier(req,res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.suppliersUsecase.updateSupplier(id, data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async deleteSupplier(req,res) {
        try {
            const id = req.params.id 
            await this.suppliersUsecase.deleteSupplier(id)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}