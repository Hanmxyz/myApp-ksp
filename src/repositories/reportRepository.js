import { prisma } from "../../server.js"

export default class ReportRepository {

    convertWIBtoUTC(dateStr, hour, minute = 0, second = 0, ms = 0) {
        // Buat waktu lokal WIB
        const local = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(ms).padStart(3, '0')}`);
        // Kurangi 7 jam untuk jadi UTC
        return new Date(local.getTime() - (7 * 60 * 60 * 1000));
    }


    async getAllSales(queryString) {
        try {

            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
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
            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
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
            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
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
            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const vendorSale = await prisma.vendorSale.findMany({
                where: {
                    transactionDate: {
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
                    createdAt: {
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
            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
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
            const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
            const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);
            // const year = queryString.year
            // const month = parseInt(queryString.month) - 1
            // const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            // const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
            const payment = await prisma.paymentVendorSale.findMany({
                where: {
                    paymentDate: {
                        gte: startDate,
                        lte: endDate
                    }
                },
            })
            const vendor = await prisma.vendor.findMany({
                select: {
                    id: true,
                    name: true
                }
            })

            return { payment, vendor }
        } catch (error) {
            throw error

        }
    }
}