export default class SuppliersUsecase {
    constructor(suppliersRepository){
        this.suppliersRepository = suppliersRepository
    } 

    async getAllSuppliers() {
        return await this.suppliersRepository.getAllSuppliers()
    }

    async getSupplierById(id) {
        return await this.suppliersRepository.getSupplierById(id)
    }

    async createSupplier(data) {
        return await this.suppliersRepository.createSupplier(data)
    }

    async updateSupplier(id,data) {
        return await this.suppliersRepository.updateSupplier(id, data)
    }

    async deleteSupplier(id) {
        return await this.suppliersRepository.deleteSupplier(id)
    }
}