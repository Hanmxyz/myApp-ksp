export default class ManagementDetailsUsecase{
    constructor(managementDetailsRepository){
        this.managementDetailsRepository = managementDetailsRepository
    }
    
    async getAllManagementDetails() {
        return await this.managementDetailsRepository.getAllManagementDetails();
    }

    async getManagementDetailById(id) {
        return await this.managementDetailsRepository.getManagementDetailById(id);
    }

    async createManagementDetail(data) {
        return await this.managementDetailsRepository.createManagementDetail(data)
    }
    async updateManagementDetail(id, data) {
        return await this.managementDetailsRepository.updateManagementDetail(id, data)
    }

    async deleteManagementDetail(id) {
        return await this.managementDetailsRepository.deleteManagementDetail(id)
    }
}