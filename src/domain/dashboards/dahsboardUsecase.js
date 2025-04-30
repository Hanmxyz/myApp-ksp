import ProductsUsecase from "../products/productsUsecase.js"
import ProductsRepository from "../../repositories/productsRepository.js"

export default class DashboardUsecase {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository
        this.ProductsUsecase = new ProductsUsecase(new ProductsRepository)
    }

    async getDashboards() {
        const { allSale, allSaleDay } = await this.dashboardRepository.getSaleDashboard()
        const { allPurchase, allPurchaseDay } = await this.dashboardRepository.getPurchaseDashboard()
        const { allProfitSales, todayProfitSales } = await this.dashboardRepository.getProfitSaleDashboard()
        const { allProfitVS, todayProfitVS } = await this.dashboardRepository.getProfitVendorSaleDashboard() 
        const { allOpcost, todayOpcost } = await this.dashboardRepository.getOpcostDashboard()
        const allProducts = await this.ProductsUsecase.getAllProducts()

        console.log(allProfitSales, todayProfitSales)
        let allPs = 0
        let todayPs = 0
        for (const item of allProfitSales) {
            allPs += ((item.salePrice * item.quantity) - (item.purchasePrice * item.quantity))
        }
        for (const item of todayProfitSales) {
            todayPs += ((item.salePrice * item.quantity) - (item.purchasePrice * item.quantity)) 
        }

        const notifMinSock = allProducts.data.map( item => {
            if(item.stock <= item.minStock) {
                return { name : item.name, message : "stock dibawah minimal", stock : `${item.stock} < ${item.minStock}`}
            } 
        }).filter(Boolean)

        const data = {
            sale: {
                overallTotal : allSale._sum.totalAmount || 0,
                dailyTotal : allSaleDay._sum.totalAmount || 0
            },
            purchase: {
                overallTotal : allPurchase._sum.totalAmount || 0,
                dailyTotal : allPurchaseDay._sum.totalAmount || 0
            },
            profitSale: {
                overallTotal : allPs || 0 ,
                dailyTotal : todayPs || 0
            },
            profitVendorSale: {
                overallTotal : allProfitVS._sum.profitKsp || 0,
                dailyTotal : todayProfitVS._sum.profitKsp || 0
            },
            opcost: {
                overallTotal : allOpcost._sum.cost || 0,
                dailyTotal : todayOpcost._sum.cost || 0
            },
            minStock : notifMinSock
        }

        return data
    }
}