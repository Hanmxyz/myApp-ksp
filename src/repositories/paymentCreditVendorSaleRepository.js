import { prisma } from "../../server.js"

export default class PaymentCreditVendorSaleRepository{

    async getAllCreditMember() {
        return await prisma.paymentCreditVendorSale.findMany({
            include : {
                member : true
            }
        })
    }

    async getCreditMemberByNip(nip) {
        return await prisma.paymentCreditVendorSale.findMany({
            where : { nip : String(nip) },
            include : { member : true}
        })
    }

    async updateCreditMember(data) {
        await Promise.all(
            data.map( p => 
                prisma.paymentCreditVendorSale.update({
                    where : { id : Number(p.id)},
                    data : {
                        paymentTotal : p.paymentTotal,
                        paymentDate : new Date(),
                        status : p.status
                    }
                })
            )
        )
    }
}