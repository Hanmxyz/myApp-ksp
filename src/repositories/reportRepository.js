import { prisma } from "../../server.js"

export default class ReportRepository {


    async getAllSales(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const sale = await prisma.sale.findMany({
                where: {
                    saleDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    member: true
                }
            })

            const saleDetails = await prisma.saleDetail.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
                , include: {
                    product: true
                }
            })
            return { sale, saleDetails }
        } catch (error) {
            throw error
        }
    }

    async getAllPurchases(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const purchases = await prisma.purchase.findMany({
                where: {
                    purchaseDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    supplier: true
                }
            })

            const purchaseDetails = await prisma.purchaseDetail.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    product: true,
                    stock: true
                }
            })

            return { purchases, purchaseDetails }
        } catch (error) {
            throw error
        }
    }

    async getAllCredits(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const creditSale = await prisma.paymentCreditSale.findMany({
                where: {
                    paymentDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    member: true
                }
            })

            const creditVendorSale = await prisma.paymentCreditVendorSale.findMany({
                where: {
                    paymentDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                include: {
                    member: true
                }
            })
            return { creditSale, creditVendorSale }

        } catch (error) {
            throw error
        }
    }

    async getAllVendorSales(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const vendorSale = await prisma.vendorSale.findMany({
                where: {
                    transactionDate : {
                        gte: startDate,
                    lte: endDate
                    }
                },
                include: {
                    member: true
                }
            })
            const vendorSaleDetail = await prisma.vendorSaleDetail.findMany({
                where: {
                   createdAt : {
                    gte: startDate,
                    lte: endDate
                   }
                },
                include: {
                    vendorProduct: true
                }
            })
            return { vendorSale, vendorSaleDetail }
        } catch (error) {
            throw error
        }
    }

    async getAllOperationalCosts(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            return await prisma.operationalCost.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getAllPaymentVendors(queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const payment = await prisma.paymentVendorSale.findMany({
                where : {
                    paymentDate : {
                        gte : startDate,
                        lte : endDate
                    }
                },
            })
            const vendor = await prisma.vendor.findMany({
                select : {
                    id: true,
                    name : true
                }
            })

            return { payment, vendor }
        } catch (error) {
            throw error
            
        }
    }
}