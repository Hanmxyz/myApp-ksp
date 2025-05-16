import { prisma } from "../../server.js"

export default class SalesRepository {

    async getAllSales() {
        return await prisma.sale.findMany()
    }

    async getDetailSaleBySaleId(id) {
        return await prisma.saleDetail.findMany({
            where: { saleId: Number(id) },
            include: {
                product: true
            }
        })
    }

    async createSale(data, details) {

        try {
            const isCredit = data.paymentMetode === "bon";

            const result =  await prisma.sale.create({
                data: {
                    saleDate: new Date(),
                    nip: data.nip,
                    totalAmount: parseFloat(data.totalAmount),
                    paymentType: data.paymentType,
                    paymentStatus: data.paymentStatus,
                    paymentMetode: data.paymentMetode,
                    totalPayment: parseFloat(30000),
                    change: parseFloat(20000),
                    userId: 1
                    // details: {
                    //     create: details.map(p => ({
                    //         productId: p.productId,
                    //         stockId: p.stockId,
                    //         purchasePrice: parseFloat(p.purchasePrice),
                    //         salePrice: parseFloat(p.salePrice),
                    //         quantity: p.quantity,
                    //         subtotal: parseFloat(p.quantity * p.salePrice)
                    //     }))
                    // },
                    // ...(isCredit && {
                    //     credit: {
                    //         create: [
                    //             {
                    //                 nip: data.nip,
                    //                 paymentTotal: parseFloat(data.totalAmount),
                    //                 paymentDate: new Date(),
                    //                 status: "cicilan"
                    //             }
                    //         ]
                    //     }
                    // })
                }
            })
            console.log(result)
            return result
        } catch (error) {
            throw error
        }
    }
}