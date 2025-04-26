export default class VendorSalesHandler{
    constructor(vendorSalesUsecase){
        this.vendorSalesUsecase = vendorSalesUsecase
    }


    async getAllVendorSales(req,res) {
        try {
            const data = await this.vendorSalesUsecase.getAllVendorSales()
            res.json(data)
        } catch (error) {
            res.satus(500).json({ message : error.message })
        }
    }
    async createVendorSale(req,res) {
       try {
        const data = req.body
        const response = await this.vendorSalesUsecase.createVendorSale(data)
        res.json({ message : true, data : response})
       } catch (error) {
        res.status(500).json({ message : error.message })
       }
    }
}