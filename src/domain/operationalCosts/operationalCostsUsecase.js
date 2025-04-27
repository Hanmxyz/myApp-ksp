export default class OperationalCostsUsecase{
    constructor(operationalCostsRepository) {
        this.operationalCostsRepository = operationalCostsRepository
    }

    async getAllOperationalCosts() {
        return await this.operationalCostsRepository.getAllOperationalCosts()
    }

    async createOperationalCost(data) {
        return await this.operationalCostsRepository.createOperationalCost(data)
    }

    async updateOperatinalCost(data, id) {
        return await this.operationalCostsRepository.updateOperatinalCost(data, id)
    }

    async deleteOperationalCost(id) {
        return await this.operationalCostsRepository.deleteOperationalCost(id)
    }
}