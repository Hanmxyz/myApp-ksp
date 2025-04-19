import StockRepository from "../../repositories/stockRepository.js"

export default class PurchasesUsecase{
    constructor(purchasesRepository) {
        this.purchasesRepository = purchasesRepository
        this.stockRepository = new StockRepository()
    }

    async getAllPurchases() {
        const data = await this.purchasesRepository.getAllPurchases()

        const newData = { 
            title : "pembelian",
            header : ["kode pembelian",  "tanggal pembelian", "supplier", "status"],
            data : data.map(p => ({
                id : p.id,
                purchaseDate : p.purchaseDate,
                supplier : p.supplier.name,
                totalAmount : p.totalAmount,
                status : p.isPaid
            }))
        }

        return newData
    }

    async getDetailPurchaseByPurchaseId(id) {
        const data = await this.purchasesRepository.getDetailPurchaseByPurchaseId(id)

        const newData = data.map( p => {
            return  {
                id : p.id,
                product : p.product.name,
                purchasePrice : p.purchasePrice,
                retailPrice : p.retailPrice,
                wholesalePrice : p.wholesalePrice,
                quantity : p.quantity,
                subtotal : p.subtotal
            }
        })

        return newData
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
        const updateStockPromises = newCreateStock.map(async (stock) => {
            return await this.stockRepository.getStockByProductId(stock.productId);
          });
          
          const updateStock = await Promise.all(updateStockPromises);

        const newData = {
            supplierId : data.supplierId,
            totalAmount : data.totalAmount,
            status : data.status,
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