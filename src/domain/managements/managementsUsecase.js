export default class ManagementsUsecase{
    constructor(managementsRepository){
        this.managementsRepository = managementsRepository
    }

    async getAllManagemets() {
        return await this.managementsRepository.getAllManagemets()
    }

    async getManagementById(id) {
        return await this.managementsRepository.getManagementById(id)
    }

    async createManagement(data) {
        return await this.managementsRepository.createManagement(data)
    }

    async updateManagement(id, data) {
        return await this.managementsRepository.updateManagement(id, data)
    }

    async deleteManagement(id) {
        return await this.managementsRepository.deleteManagement(id)
    }
}