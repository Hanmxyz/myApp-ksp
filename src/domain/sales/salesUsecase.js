import ProductsRepository from "../../repositories/productsRepository.js"
import StockRepository from "../../repositories/stockRepository.js"

export default class SalesUsecase {
    constructor(salesRepository) {
        this.salesRepository = salesRepository
        this.productRepository = new ProductsRepository()
        this.stockRepository = new StockRepository()
    }

    async getAllSales() {
        const data = await this.salesRepository.getAllSales()

        const newData = {
            title : "penjualan",
            header : ["kode penjualan", "tanggal ", "nip member", "total", "tipe pembayaran", "status pembayaran", "metode pembayaran"],
            data : data
        }
        return newData
    }

    async getDetailSaleBySaleId(id) {
        const data = await this.salesRepository.getDetailSaleBySaleId(id)

        const newData = data.map( p => {
            return {
                id : p.id,
                product : p.product.name,
                stock : (p.stockId === 0 ? "stock default" : "stock baru"),
                purchasePrice : p.purchasePrice,
                salePrice : p.salePrice,
                quantity : p.quantity,
                subTotal : (p.quantity * p.salePrice)
            }
        })

        return newData
    }

    async createSale(data, userId) {
        console.log(data)
        const updateProducts = []
        const updateStocks = []

        const getStockOnProductPromise = data.product.map(async (p) => {
            
            return await this.productRepository.getProductStockById(p.productId)
        })
        const getStockOnProduct = await Promise.all(getStockOnProductPromise)
        console.log(getStockOnProductPromise)
        const getStockOnStockPromise = data.product.map(async (p) => {
            return await this.stockRepository.getStocksByProductId(p.productId)
        })
        const getStockOnStock = (await Promise.all(getStockOnStockPromise)).flat()
        console.log(getStockOnStock)
        

        
        for (const product of data.product) {
            const firstOption = getStockOnProduct.find(item => item.id === product.productId)
            const firstResult = firstOption.stock - product.quantity


            if (firstResult > 0) {
                updateProducts.push({ id: firstOption.id, stock: firstResult })
            } else {
                function updateStockAndDistribute(data, quantity, productId) {
                    const stockFilter = data.filter(item => item.productId === productId)
                    const sortedStock = stockFilter.sort((a, b) => a.id - b.id);
                    let remainingQuantity = Math.abs(quantity);
                    const updatedStock = [];
    
                    for (const item of sortedStock) {
                        const stockToReduce = Math.min(remainingQuantity, item.stock);
                        const newStock = Math.max(0, item.stock - stockToReduce);
                        updatedStock.push({ id: item.id, productId: item.productId, stock: newStock });
                        remainingQuantity -= stockToReduce;
                        if (remainingQuantity <= 0) {
                            break;
                        }
                    }
                    return updatedStock
    
                }
                const secondResult = updateStockAndDistribute(getStockOnStock, firstResult, product.productId)
                updateProducts.push({ id: firstOption.id, stock: 0})
                updateStocks.push(secondResult)
            }
        }

        //update stock on stock
        const updateStockPromise = (updateStocks.flat()).map( async (p) => {
            await this.stockRepository.updateStockAfterSale(p.id, p.stock)
        })
        await Promise.all(updateStockPromise)
        //update stock on product
        const updateStockProductPromise = updateProducts.map(async (p) => {
            await this.productRepository.updateProductAfterSale(p.id, p.stock)
        })
        await Promise.all(updateStockProductPromise)

        const details = data.product.map( p => {
            const stockIdByProduct = updateProducts.find(item => item.id === p.productId)
            if (stockIdByProduct.stock > 0) {
                return {
                    productId : p.productId,
                    stockId : 0,
                    purchasePrice : p.purchasePrice,
                    salePrice : p.salePrice,
                    quantity : p.quantity
                }
            } else {
                const stockIdByStock = (updateStocks.flat()).filter(item => item.productId === p.productId)
                const index = stockIdByStock.length - 1
                const stockId = stockIdByStock[index]
                return {
                    productId : p.productId,
                    stockId : stockId.id,
                    purchasePrice : p.purchasePrice,
                    salePrice : p.salePrice,
                    quantity : p.quantity
                }
            }
        })
        // console.log("updateproduct",updateProducts)
        // console.log("updatestock",updateStocks)
        console.log("details: ",details)
        return this.salesRepository.createSale(data, details, userId)
    }
}