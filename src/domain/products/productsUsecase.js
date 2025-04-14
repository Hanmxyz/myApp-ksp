class ProductsUsecase {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }

    async getAllProducts() {
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
                wholesalePrice: p.wholesalePrice,
                stock: p.stock,
                minStock: p.minStock,
                barcode: p.barcode,
                image: p.image,
                category: p.category.name,
                size: p.size,
                unit: p.unit,
                isActive: p.isActive
            }
        })
        const newData = {
            title: "product",
            header: ["id", "name", "purchasePrice", "retailPrice", "wholesalePrice", "stock", "minStock", "barcode", "image", "category", "size", "unit", "isActive"],
            data: product
        }


        return newData
    }

    async getProductById(id) {
        return await this.productsRepository.getProductById(id);
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
