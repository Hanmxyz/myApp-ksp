import { prisma } from "../../server.js"

export default class PaymentCreditSalesRepository{

    async getAllCreditMemberPerMonth(queryString) {
        // return await prisma.paymentCreditSale.findMany({
        //     include : {
        //         member : true
        //     }
        // })

        const year = queryString.year
        const month = queryString.month
        const startDate = new Date(year, month - 1, 29); // 29 bulan yang diinput
        const endDate = new Date(year, month, 28, 23, 59, 59, 999); // 28 bulan berikutnya full day
        console.log(startDate)
        console.log(endDate)
        return await prisma.paymentCreditSale.findMany({
            where: {
                paymentDate : {
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

    async updateCreditMemberByNipPerMonth(data, queryString) {
        const year = queryString.year
        const month = queryString.month
        const startDate = new Date(year, month - 1, 29); // 29 bulan yang diinput
        const endDate = new Date(year, month, 28, 23, 59, 59, 999); // 28 bulan berikutnya full day

        try {
            const updatePromises = data.map( async (item) => {
                return prisma.paymentCreditSale.updateMany({
                    where : {
                        nip : String(item.nip), 
                        paymentDate : {
                            gte: startDate,
                            lte: endDate,
                        },
                    }, data : {
                        status : item.status
                    }
                })
            })
            const result = await Promise.all(updatePromises)
        } catch (error) {
            throw error
        }
    }
}