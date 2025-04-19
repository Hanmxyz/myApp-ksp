import { prisma } from "../../server.js"

export default class SalesRepository {

    async getAllSales() {
        return await prisma.sale.findMany()
    }

    async createSale(data, details) {
        return await prisma.sale.create({
            data : {
                saleDate : new Date(),
                nip : data.nip,
                totalAmount : parseFloat(data.totalAmount),
                paymentType : data.paymentType,
                paymentStatus : data.paymentStatus,
                paymentMetode : data.paymentMetode,
                details : {
                    create : details.map( p => ({
                        productId : p.productId,
                        stockId : p.stockId,
                        purchasePrice : parseFloat(p.purchasePrice),
                        salePrice : parseFloat(p.salePrice),
                        quantity : p.quantity
                    }))
                }
            }
        })
    }
}