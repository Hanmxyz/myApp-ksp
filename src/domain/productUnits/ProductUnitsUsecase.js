export default class ProductUnitsUsecase {
    constructor(productUnitsRepository) {
        this.productUnitsRepository = productUnitsRepository
    }  

    async getAllProductUnits() {
        return await this.productUnitsRepository.getAllProductUnits();
    }

    async getProductUnitById(id) {
        return await this.productUnitsRepository.getProductUnitById(id)
    }

    async createProductUnit(data) {
        return await this.productUnitsRepository.createProductUnit(data)
    }

    async updateProductUnit(id, data) {
        return await this.productUnitsRepository.updateProductUnit(id, data)
    }

    async deleteProductUnit(id) {
        return await this.productUnitsRepository.deleteProductUnit(id)
    }
    
}