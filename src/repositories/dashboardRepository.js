import { prisma } from "../../server.js"

export default class DashboardRepository {

    getDay() {
        const now = new Date();

        // Ubah ke WIB (UTC+7)
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibOffset = 7 * 60 * 60000; // 7 jam dalam milidetik
        const wibNow = new Date(utc + wibOffset);

        // Set jam ke 00:00:00 di WIB
        wibNow.setHours(0, 0, 0, 0);
        const today = new Date(wibNow);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return { today, tomorrow };
    }

    getYearly() {
        const start = new Date();
        start.setMonth(0);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setMonth(11);
        end.setDate(31);
        end.setHours(23, 59, 59, 999);

        return { start, end }
    }

    async getSaleDashboard() {
        try {
            const { today, tomorrow } = this.getDay()
            const allSale = await prisma.sale.aggregate({
                _sum: {
                    totalAmount: true
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
                    totalAmount: true
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
            const { today, tomorrow } = this.getDay()
            const allPurchase = await prisma.purchase.aggregate({
                _sum: {
                    totalAmount: true
                }
            })
            const allPurchaseDay = await prisma.purchase.aggregate({
                where: {
                    purchaseDate: {
                        gte: today,
                        lte: tomorrow
                    }
                },
                _sum: {
                    totalAmount: true
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
                select: {
                    purchasePrice: true,
                    salePrice: true,
                    quantity: true
                }
            })
            const todayProfitSales = await prisma.saleDetail.findMany({
                where: {
                    createdAt: {
                        gte: today,
                        lte: tomorrow
                    }
                },
                select: {
                    purchasePrice: true,
                    salePrice: true,
                    quantity: true
                }
            })

            return { allProfitSales, todayProfitSales }
        } catch (error) {
            throw error
        }
    }

    async getProfitVendorSaleDashboard() {
        try {
            const { today, tomorrow } = this.getDay()
            const allProfitVS = await prisma.vendorSale.aggregate({
                _sum: {
                    profitKsp: true
                }
            })
            const todayProfitVS = await prisma.vendorSale.aggregate({
                where: {
                    transactionDate: {
                        gte: today,
                        lte: tomorrow
                    }
                },
                _sum: {
                    profitKsp: true
                }
            })
            return { allProfitVS, todayProfitVS }
        } catch (error) {
            throw error
        }
    }

    async getOpcostDashboard() {
        try {
            const { today, tomorrow } = this.getDay()
            const allOpcost = await prisma.operationalCost.aggregate({
                _sum: {
                    cost: true
                }
            })
            const todayOpcost = await prisma.operationalCost.aggregate({
                where: {
                    createdAt: {
                        gte: today,
                        lte: tomorrow
                    }
                },
                _sum: {
                    cost: true
                }
            })

            return { allOpcost, todayOpcost }
        } catch (error) {

        }
    }

    async getChart(queryString) {
        const type = queryString.type
        const year = new Date().getFullYear()
        const { start, end } = this.getYearly(year)
        try {
            if (type === "purchase") {
                const allRecordsOfYear = await prisma.purchase.findMany({
                    where: {
                        purchaseDate: {
                            gte: start,
                            lte: end,
                        },
                    },
                    select: {
                        purchaseDate: true,
                        totalAmount: true
                    },
                    orderBy: {
                        purchaseDate: 'asc', // Optional: Order by date for easier processing
                    },
                });
                return allRecordsOfYear.map(item => { return { date: item.purchaseDate, totalAmount: item.totalAmount } })
            } else if (type === "sale") {
                const allRecordsOfYear = await prisma.sale.findMany({
                    where: {
                        saleDate: {
                            gte: start,
                            lte: end,
                        },
                    },
                    select: {
                        saleDate: true,
                        totalAmount: true
                    },
                    orderBy: {
                        saleDate: 'asc', // Optional: Order by date for easier processing
                    },
                });
                return allRecordsOfYear.map(item => { return { date: item.saleDate, totalAmount: item.totalAmount } })
            } else if (type === "profitSale") {
                const allProfitSales = await prisma.saleDetail.findMany({
                    where: {
                        createdAt: {
                            gte: start,
                            lte: end
                        }
                    },
                    select: {
                        createdAt: true,
                        purchasePrice: true,
                        salePrice: true,
                        quantity: true
                    }, orderBy: {
                        createdAt: "asc"
                    }
                })
                const allRecordsOfYear = allProfitSales.map(item => {
                    const totalAmount = ((item.salePrice * item.quantity) - (item.purchasePrice * item.quantity))
                    return { date: item.createdAt, totalAmount: totalAmount }
                })
                return allRecordsOfYear
            } else if (type === "profitVendorSale") {
                const allRecordsOfYear = await prisma.vendorSale.findMany({
                    where: {
                        transactionDate: {
                            gte: start,
                            lte: end,
                        },
                    },
                    select: {
                        transactionDate: true,
                        totalAmount: true
                    },
                    orderBy: {
                        transactionDate: 'asc', // Optional: Order by date for easier processing
                    },
                });
                return allRecordsOfYear.map(item => { return { date: item.transactionDate, totalAmount: item.totalAmount } })
            } else return { message: "data tidak ditemukan" }
        } catch (error) {
            throw error
        }
    }

    async getTopLoyalMemberLeader() {
        try {
            const sale = await prisma.sale.groupBy({
                by: ['nip'],
                _sum: {
                    totalAmount: true
                },
                _count: {
                    id: true
                }
            })

            const vendorSale = await prisma.vendorSale.groupBy({
                by: ['nip'],
                _sum: {
                    totalAmount: true
                },
                _count: {
                    id: true
                }
            })

            const member = await prisma.member.findMany({
                select: {
                    nip: true,
                    name: true
                }
            })

            return { sale, vendorSale, member }
        } catch (error) {
            throw error
        }
    }
}