import { prisma } from "../../server.js"


export default class VendorSalesRepository{

    async createVendorSale(data) {
        const isCredit = data.paymentMetode === "bon"
        return await prisma.vendorSale.create({
            data :{
                nip : data.nip,
                totalAmount : data.totalAmount,
                profitKsp : parseFloat(100),
                paymentMetode : data.paymentMetode,
                paymentStatus : data.paymentStatus,
                details : {
                    create : data.product.map ( p => ({
                        vendorProductId : p.vendorProductId,
                        salePrice : p.salePrice,
                        quantity : p.quantity,
                        subtotal : parseFloat(p.salePrice * p.quantity)
                    }))
                },
                ...( isCredit && {
                    credit : {
                        create : [
                            {
                                nip : data.nip,
                                paymentTotal : parseFloat(data.totalAmount),
                                paymentDate : new Date(),
                                status : "cicilan"
                            }
                        ]
                    }
                })
            }
        })
    }
}