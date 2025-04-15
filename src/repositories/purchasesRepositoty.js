import { prisma } from "../../server.js"

export default class PurchasesRepository{
    async createPurchase(data) {
        const purchase = await prisma.purchase.create({
            data : {
                purchaseDate : new Date(),
                supplierId : data.supplierId,
                totalAmount : parseFloat(data.totalAmount),
                isPaid : data.isPaid,
                details : {
                    create : data.product.map( p => ({
                        productId : p.productId,
                        stockId : p.stockId,
                        purchasePrice : p.purchasePrice,
                        retailPrice : p.retailPrice,
                        wholesalePrice : p.wholesalePrice,
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
                    purchasePrice : p.purchasePrice,
                    retailPrice : p.retailPrice,
                    wholesalePrice : p.wholesalePrice
                }
            })
        ))

        return purchase
    }
}