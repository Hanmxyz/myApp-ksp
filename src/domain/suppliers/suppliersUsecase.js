export default class SuppliersUsecase {
    constructor(suppliersRepository){
        this.suppliersRepository = suppliersRepository
    } 

    async getAllSuppliers() {
        const data = await this.suppliersRepository.getAllSuppliers()
        const supplier = data.map( p => {
            return {
                id : p.id,
                name : p.name,
                address : p.address,
                phoneNumber : p.phoneNumber,
                company : p.company,
                isActive : p.isActive
            }
        })
        const newData = {
            title :  "supplier",
            header : ["id","name", "address", "phoneNumber" , "company", "isActive"],
            data : supplier 
        }

        return newData
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