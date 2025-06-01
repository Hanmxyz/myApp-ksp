import { prisma } from "../../server.js"
import { convertWIBtoUTC } from "../lib/convertDate.js"

export default class NotifRepository {



    // async getTotalAllSales(queryString) {
    //     try {
    //         const startDate = convertWIBtoUTC(queryString.startDate)
    //         const endDate = convertWIBtoUTC(queryString.endDate)

    //         const result = await prisma.sale.aggregate({
    //             where: {
    //                 saleDate: {
    //                     gte: startDate,
    //                     lte: endDate
    //                 },

    //             }
    //         })
    //     } catch (error) {

    //     }
    // }

    async getTotalModal() {
        try {
            const stock = await prisma.stock.findMany({
                select: {
                    purchasePrice: true,
                    stock: true
                }
            })

            const product = await prisma.product.findMany({
                select: {
                    purchasePrice: true,
                    stock: true
                }
            })

            return { stock, product }
        } catch (error) {
            throw new Error(error)
        }
    }
}