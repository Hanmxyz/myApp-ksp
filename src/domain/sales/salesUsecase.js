export default class SalesUsecase{
    constructor(salesRepository){
        this.salesRepository = salesRepository
    }

    async createSale(data) {
        return this.salesRepository.createSale(data)
    }
}