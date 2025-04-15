import StockRepository from "../../repositories/stockRepository.js"

export default class PurchasesUsecase{
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository
        this.stockRepository = new StockRepository()
    }

    async createPurchase(data) {
        const newCreateStock = data.product.map( p => {
            return {
                productId : p.productId,
                purchasePrice :  p.purchasePrice,
                stock : p.quantity
            }
        })
        await this.stockRepository.createStock(newCreateStock)
        const updateStock = []
        for (const stock of newCreateStock) {
            const getUpdateStock = await this.stockRepository.getStockByProductId(stock.productId)
            updateStock.push(getUpdateStock)
        }

        const newData = {
            supplierId : data.supplierId,
            totalAmount : data.totalAmount,
            isPaid : data.isPaid,
            product : data.product.map(p => {
                const match = updateStock.find(item => item.productId === p.productId)?.id
                return {
                    productId : p.productId,
                    stockId : match,
                    purchasePrice : p.purchasePrice,
                    retailPrice : p.retailPrice,
                    wholesalePrice : p.wholesalePrice,
                    quantity : p.quantity,
                    subtotal : p.subtotal
                }
            })
        }

        return this.purchasesRepository.createPurchase(newData)
    }
}