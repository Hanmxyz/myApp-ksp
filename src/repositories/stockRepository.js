import { prisma } from "../../server.js";

export default class StockRepository {

    async getStockByProductId(productId) {
        return await prisma.stock.findFirst({
            where: {
                productId: productId
            },
            orderBy: [
                {id: 'desc'}
            ]
        })
    }

    async getStocksByProductId(productId) {
        return await prisma.stock.findMany({
            where : { productId : productId}
        })
    }

    async createStock(data) {
        return await prisma.stock.createMany({
            data: data
        })
    }

    async updateStockAfterSale(id, data) {
        return await prisma.stock.update({
            where : { id : Number(id)},
            data : {
                stock : data
            }
        })
    }
}