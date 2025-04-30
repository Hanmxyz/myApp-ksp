import { prisma } from "../../server.js"

export default class PaymentCreditVendorSaleRepository {

    async getAllCreditMember() {
        return await prisma.paymentCreditVendorSale.findMany({
            include: {
                member: true
            }
        })
    }

    async getAllCreditMemberPerMonth(queryString) {
        const year = queryString.year
        const month = parseInt(queryString.month) - 1
        const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
        const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
        return await prisma.paymentCreditVendorSale.findMany({
            where: {
                paymentDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                member: true,
            },
        });

    }

    async getCreditMemberByNip(nip) {
        return await prisma.paymentCreditVendorSale.findMany({
            where: { nip: String(nip) },
            include: { member: true }
        })
    }

    async getDetailTransactionCreditMemberPerMonth(nip, queryString) {
        try {
            const year = queryString.year
            const month = parseInt(queryString.month) - 1
            const startDate = new Date(year, month.toString() - 1, 29); // 29 bulan yang diinput
            const endDate = new Date(year, month.toString(), 28, 23, 59, 59, 999); // 28 bulan berikutnya full day

            const matchSale = await prisma.paymentCreditVendorSale.findMany({
                where: {
                    nip : String(nip),
                    paymentDate: {
                        gte: startDate,
                        lte: endDate,
                    },
                }
            });

            const updatePromises = matchSale.map(async (item) => {
                return prisma.vendorSaleDetail.findMany({
                    where: {
                        vendorSaleId: Number(item.vendorSaleId),
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    include : {
                        vendorProduct : true
                    }
                })
            })
            return { matchSale , details}
        } catch (error) {
            throw error
        }
    }

    async updateCreditMember(data) {
        await Promise.all(
            data.map(p =>
                prisma.paymentCreditVendorSale.update({
                    where: { id: Number(p.id) },
                    data: {
                        paymentTotal: p.paymentTotal,
                        paymentDate: new Date(),
                        status: p.status
                    }
                })
            )
        )
    }
    
    async updateCreditMemberByNipPerMonth(data, queryString) {
        const year = queryString.year
        const month = parseInt(queryString.month) - 1
        const startDate = new Date(year, month - 1, 29); // 29 bulan yang diinput
        const endDate = new Date(year, month, 28, 23, 59, 59, 999); // 28 bulan berikutnya full day

        try {
            const updatePromises = data.map(async (item) => {
                return prisma.paymentCreditVendorSale.updateMany({
                    where: {
                        nip: String(item.nip),
                        paymentDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    }, data: {
                        status: item.status
                    }
                })
            })
            const result = await Promise.all(updatePromises)
        } catch (error) {
            throw error
        }
    }

}