import { prisma } from "../../server.js"

export default class PaymentCreditSalesRepository {

    convertWIBtoUTC(dateStr, hour, minute = 0, second = 0, ms = 0) {
        // Buat waktu lokal WIB
        const local = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(ms).padStart(3, '0')}`);
        // Kurangi 7 jam untuk jadi UTC
        return new Date(local.getTime() - (7 * 60 * 60 * 1000));
    }


    async getAllCreditMember() {
        return await prisma.paymentCreditSale.findMany({
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
        return await prisma.paymentCreditSale.findMany({
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
        return await prisma.paymentCreditSale.findMany({
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
            const matchSale = await prisma.paymentCreditSale.findMany({
                where: {
                    nip: String(nip),
                    paymentDate: {
                        gte: startDate,
                        lte: endDate,
                    },
                }
            });

            const updatePromises = matchSale.map(async (item) => {
                return prisma.saleDetail.findMany({
                    where: {
                        saleId: Number(item.saleId),
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    include: {
                        product: true
                    }
                })
            })
            const details = await Promise.all(updatePromises)
            return { matchSale, details }
        } catch (error) {
            throw error
        }
    }

    async updateCreditMember(data) {
        await Promise.all(
            data.map(p => (
                prisma.paymentCreditSale.update({
                    where: { id: Number(p.id) },
                    data: {
                        paymentTotal: p.paymentTotal,
                        paymentDate: new Date(),
                        status: p.status
                    }
                })
            ))
        )
    }

    async updateCreditMemberByNipPerMonth(data, queryString) {
        const startDate = this.convertWIBtoUTC(queryString.startDate, 0);
        const endDate = this.convertWIBtoUTC(queryString.endDate, 23, 59, 59, 999);

        try {
            const updatePromises = data.map(async (item) => {
                return prisma.paymentCreditSale.updateMany({
                    where: {
                        nip: String(item.nip),
                        paymentDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    data: {
                        status: item.status
                    }
                })
            })
            const result = await Promise.all(updatePromises)
            return result
        } catch (error) {
            throw error
        }
    }
}