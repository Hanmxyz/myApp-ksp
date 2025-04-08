export default class VendorsUsecase{
    constructor(vendorsRepository) {
        this.vendorsRepository = vendorsRepository
    }

    async getAllVendors() {
        return await this.vendorsRepository.getAllVendors()
    }

    async getVendorById(id) {
        return await this.vendorsRepository.getVendorById(id)
    }

    async createVendor(data) {
        return await this.vendorsRepository.createVendor(data)
    }

    async updateVendor(id, data) {
        return await this.vendorsRepository.updateVendor(id, data)
    }

    async deleteVendor(id) {
        return await this.vendorsRepository.deleteVendor(id)
    }
}