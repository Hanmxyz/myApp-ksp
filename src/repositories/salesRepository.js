import { prisma } from "../../server.js"

export default class SalesRepository {

    async createSale(data) {
        return await prisma.sale.create({
            data : {
                saleDate : new Date(),
                nip : data.nip,
                totalAmount : parseFloat(data.totalAmount),
                paymentType : data.paymentType,
                isPaid : data.isPaid,
                isCash : data.isCash,
                details : 
            }
        })
    }
}