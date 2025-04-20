export default class VendorSalesUsecase{
    constructor(vendorSalesRepository){
        this.vendorSalesRepository = vendorSalesRepository
    }


    async createVendorSale(data) {
        return await this.vendorSalesRepository.createVendorSale(data)
    }
}