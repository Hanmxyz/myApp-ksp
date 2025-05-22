class ProductsUsecase {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async getAllP() {
        const data = await this.productsRepository.getAllProducts();
        const stock = data.stock.map(p => {
            return {
                productId: p.productId,
                purchasePrice: p.purchasePrice,
                stock: p.stock
            }
        })
        let result = stock.reduce((acc, curr) => {
            let existing = acc.find(item => item.productId === curr.productId)
            if (existing) {
                existing.stock += curr.stock
                existing.purchasePrice = Math.max(existing.purchasePrice, curr.purchasePrice);
            } else {
                acc.push({ productId: curr.productId, purchasePrice: curr.purchasePrice, stock: curr.stock })
            }
            return acc
        }, [])
        const updateProduct = data.product.map(product => {

            const update = result.find(u => u.productId === product.id);
            if (update) {
                return { ...product, purchasePrice: update.purchasePrice, stock: update.stock + product.stock };
            }
            return product;
        })

        const product = updateProduct.map(p => {
            return { 
                id: p.id,
                name: p.name,
                purchasePrice: p.purchasePrice,
                retailPrice: p.retailPrice,
                bonPrice: p.bonPrice,
                stock: p.stock,
                minStock: p.minStock,
                barcode: p.barcode,
                image: p.image,
                category: p.category.name,
                size: p.size,
                unit: p.unit.name,
                isActive: p.isActive
            }
        })

        return product
    }
    async getAllProducts() {
        const product = await this.getAllP()
        const productIdStatus = product.map(item => {
            if (item.stock === 0) {
                return { id: item.id }
            }
        }).filter(item => item !== undefined && item !== null)
        await this.productsRepository.updateProductByGet(productIdStatus)
        const newProduct = await this.getAllP()
        const result = {
            title: "product",
            header: ["id", "name", "purchasePrice", "retailPrice", "bonPrice", "stock", "minStock", "barcode", "image", "category", "size", "unit", "isActive"],
            data: newProduct
        }
        return result
    }

    async getAllProductSearch() {
        const product = await this.getAllP()
        const data = product.filter( item => 
            item.isActive === "YES"
        )
        return data
    }
    async getProductById(id) {
        const data =  await this.productsRepository.getProductById(id);
        return { 
                id: data.id,
                name: data.name,
                purchasePrice: data.purchasePrice,
                retailPrice: data.retailPrice,
                bonPrice: data.bonPrice,
                stock: data.stock,
                minStock: data.minStock,
                barcode: data.barcode,
                image: data.image,
                category: data.category.name,
                size: data.size,
                unit: data.unit.name,
                isActive: data.isActive
            }
    }

    async createProduct(product) {
        return await this.productsRepository.createProduct(product);
    }

    async updateProduct(product, id) {
        return await this.productsRepository.updateProduct(product, id);
    }

    async deleteProduct(id) {
        return await this.productsRepository.deleteProduct(id);
    }
}


export default ProductsUsecase;
