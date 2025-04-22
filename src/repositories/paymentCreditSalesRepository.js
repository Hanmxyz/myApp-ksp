import { prisma } from "../../server.js"

export default class PaymentCreditSalesRepository{

    async getAllCreditMember() {
        return await prisma.paymentCreditSale.findMany({
            include : {
                member : true
            }
        })
    }

    async getCreditMemberByNip(nip) {
        return await prisma.paymentCreditSale.findMany({
            where : { nip : String(nip)},
            include : { member : true}
        })
    }


    async updateCreditMember(data) {
        await Promise.all(
            data.map( p => (
                prisma.paymentCreditSale.update({
                    where : { id : Number(p.id)},
                    data : {
                        paymentTotal : p.paymentTotal,
                        paymentDate : new Date(),
                        status : p.status
                    }
                })
            ))
        )
    }
}