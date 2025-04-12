export default class VendorsUsecase{
    constructor(vendorsRepository) {
        this.vendorsRepository = vendorsRepository
    }

    async getAllVendors() {
        const data = await this.vendorsRepository.getAllVendors()
        const vendor = data.map( p => {
            return {
                id : p.id,
                name : p.name,
                phoneNumber : p.phoneNumber,
                address : p.address,
                isActive : p.isActive,
                products : p.products
            }
        })
        const newData = {
            title : "vendor",
            header :["id","name", "phoneNumber", "address", "isActive" , "listProduct"],
            data : vendor
        }
        return newData
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