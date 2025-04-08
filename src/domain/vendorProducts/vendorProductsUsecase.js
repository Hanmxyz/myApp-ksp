export default class VendorProductsUsecase{
    constructor(vendorProductsRepository) {
        this.vendorProductsRepository = vendorProductsRepository
    }

    async getAllVendorProducts() {
        return await this.vendorProductsRepository.getAllVendorProducts()
    }

    async getVendorProductById(id) {
        return await this.vendorProductsRepository.getVendorProductById(id)
    }

    async createVendorProduct(data) {
        return await this.vendorProductsRepository.createVendorProduct(data)
    }

    async updateVendorProduct(id, data) {
        return await this.vendorProductsRepository.updateVendorProduct(id, data)
    }

    async deleteVendorProduct(id) {
        return await this.vendorProductsRepository.deleteVendorProduct(id)
    }
}