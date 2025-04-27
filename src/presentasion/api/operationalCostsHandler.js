export default class OperationalCostsHandler {
    constructor(operationalCostsUsecase) {
        this.operationalCostsUsecase = operationalCostsUsecase
    }

    async getAllOperationalCosts(req,res) {
        try {
            const data =  await this.operationalCostsUsecase.getAllOperationalCosts()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createOperationalCost(req,res) {
        try {
            const data = req.body
            const response = await this.operationalCostsUsecase.createOperationalCost(data)
            res.json({message : true, data : response})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateOperatinalCost(req,res) {
        try {
            const id = req.params.id
            const data = req.body
            const response = await this.operationalCostsUsecase.updateOperatinalCost(data, id)
            res.json({message : true, data : response})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteOperationalCost(req,res) {
        try {
            const id = req.params.id
            const response =  await this.operationalCostsUsecase.deleteOperationalCost(id)
            res.json({ message : true, data : response})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }
}