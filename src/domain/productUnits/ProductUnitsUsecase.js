export default class ProductUnitsUsecase {
    constructor(productUnitsRepository) {
        this.productUnitsRepository = productUnitsRepository
    }  

    async getAllProductUnits() {
        const data = await this.productUnitsRepository.getAllProductUnits();
        const category = data.map(p => {
            return {
                id : p.id,
                name : p.name,
                isActive : p.isActive
            }
        })
        const newData = {
            title : "category",
            header : ["id", "name", "isActive"],
            data : category
        }

        return newData
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