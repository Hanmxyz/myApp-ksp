export default class VendorProductsUsecase{
    constructor(vendorProductsRepository) {
        this.vendorProductsRepository = vendorProductsRepository
    }

    async getAllVendorProducts() {
        const data =  await this.vendorProductsRepository.getAllVendorProducts()
        const vendorProduct = data.map( p => {
            return {
                id  : p.id,
                vendor : p.vendor.name,
                name : p.name,
                category : p.category.name,
                sellPrice : p.sellPrice,
                profitPercent : p.profitPercent
            }
        })

        return {
            title : "vendorProduct",
            header : ["id", "vendor", "name", "category", "sellPrice", "profitPercent"],
            data : vendorProduct
        }
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