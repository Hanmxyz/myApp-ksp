import { prisma } from "../../server.js"

export default class PurchasesRepository{

    async getAllPurchases() {
        return await prisma.purchase.findMany({
            include : {
                supplier : true
            }
        })
    }

    async getDetailPurchaseByPurchaseId(id) {
        return await prisma.purchaseDetail.findMany({
            where : { purchaseId : Number(id)},
            include : {
                product : true,
                stock : true
            }
        })
    }

    async createPurchase(data) {
        const purchase = await prisma.purchase.create({
            data : {
                purchaseDate : new Date(),
                supplierId : data.supplierId,
                totalAmount : parseFloat(data.totalAmount),
                isPaid : data.status,
                details : {
                    create : data.product.map( p => ({
                        productId : p.productId,
                        stockId : p.stockId,
                        purchasePrice : p.purchasePrice,
                        retailPrice : p.retailPrice,
                        bonPrice : p.bonPrice,
                        quantity : p.quantity,
                        subtotal : p.subtotal
                    }))
                }
            }
        })

        await Promise.all(data.product.map(p => 
            prisma.product.update({
                where : {
                    id : p.productId
                },
                data : {
                    retailPrice : p.retailPrice,
                    bonPrice : p.bonPrice
                }
            })
        ))

        return purchase
    }
}