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

    async createStock(data) {
        return await prisma.stock.createMany({
            data: data
        })
    }
}