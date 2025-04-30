import { prisma } from "../../server.js"

export default class DashboardRepository {

    getDay() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return { today, tomorrow }
    }

    async getSaleDashboard() {
        try {
            const { today, tomorrow } = this.getDay()
            const allSale = await prisma.sale.aggregate({
                _sum: {
                    totalAmount : true
                }
            })

            const allSaleDay = await prisma.sale.aggregate({
                where: {
                    saleDate: {
                        gte: today,
                        lte: tomorrow
                    }
                },
                _sum: {
                    totalAmount : true
                }
            })

            return { allSale, allSaleDay }
        }
        catch (error) {
            throw error
        }
    }

    async getPurchaseDashboard() {
        try {
            const { today , tomorrow } = this.getDay()
            const allPurchase = await prisma.purchase.aggregate({
                _sum : {
                    totalAmount : true
                }
            })
            const allPurchaseDay = await prisma.purchase.aggregate({
                where : {
                    purchaseDate : {
                        gte : today,
                        lte : tomorrow
                    }
                },
                _sum : {
                    totalAmount : true
                }
            })

            return { allPurchase, allPurchaseDay }
        } catch (error) {
            throw error
        }
    }

    async getProfitSaleDashboard() {
        try {
            const { today, tomorrow } = this.getDay()
            const allProfitSales = await prisma.saleDetail.findMany({
                select : {
                    purchasePrice : true,
                    salePrice : true,
                    quantity : true
                }
            })
            const todayProfitSales = await prisma.saleDetail.findMany({
                where : {
                    createdAt : {
                        gte : today,
                        lte : tomorrow
                    }
                },
                select : {
                    purchasePrice : true,
                    salePrice : true,
                    quantity : true
                }
            })

            return { allProfitSales, todayProfitSales }
        } catch (error) {
            throw error
        }
    }

    async getProfitVendorSaleDashboard() {
        try {
            const  { today , tomorrow } = this.getDay
            const allProfitVS = await prisma.vendorSale.aggregate({
                _sum : {
                    profitKsp : true
                }
            })
            const todayProfitVS = await prisma.vendorSale.aggregate({
                where : {
                    transactionDate : {
                        gte : today,
                        lte : tomorrow
                    }
                },
                _sum : {
                    profitKsp : true
                }
            })
            return { allProfitVS, todayProfitVS }
        } catch (error) {
            throw error
        }
    }

    async getOpcostDashboard() {
        try {
            const { today , tomorrow } = this.getDay()
            const allOpcost = await prisma.operationalCost.aggregate({
                _sum : {
                    cost : true
                }
            })
            const todayOpcost = await prisma.operationalCost.aggregate({
                where: {
                    createdAt : {
                        gte : today,
                        lte : tomorrow
                    }
                },
                _sum : {
                    cost : true
                }
            })

            return { allOpcost, todayOpcost }
        } catch (error) {
            
        }
    }
}