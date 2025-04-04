

export default class ManagementDetailsHandler {

    constructor(managementDetailsUsecase) {
        this.managementDetailsUsecase = managementDetailsUsecase
    }

    async getAllManagementDetails(req, res) {
        try {
            const data = await this.managementDetailsUsecase.getAllManagementDetails()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getManagementDetailById(req, res) {
        try {
            const id = req.params.id
            const data = await this.managementDetailsUsecase.getManagementDetailById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createManagementDetail(req,res) {
        try {
            const data = req.body
            await this.managementDetailsUsecase.createManagementDetail(data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }


    }
    async updateManagementDetail(req, res) {
        try {
            const id = req.params.id 
        const data = req.body
        await this.managementDetailsUsecase.updateManagementDetail(id, data) 
        res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteManagementDetail(req,res) {
        try {
            const id = req.params.id
            await this.managementDetailsUsecase.deleteManagementDetail(id)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

}