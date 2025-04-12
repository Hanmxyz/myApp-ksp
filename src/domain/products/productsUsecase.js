class ProductsUsecase {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }

    async getAllProducts() {
        const data = await this.productsRepository.getAllProducts();
        const product = data.map( p => {
            return {
                id : p.id,
                name : p.name,
                purchasePrice : p.purchasePrice,
                retailPrice : p.retailPrice,
                wholesalePrice : p.wholesalePrice,
                stock : p.stock,
                minStock : p.minStock,
                barcode : p.barcode,
                image : p.image,
                category : p.category.name,
                size : p.size,
                unit : p.unit,
                isActive : p.isActive
            }
        })
        const newData = {
            title : "product",
            header : ["id", "name", "purchasePrice", "retailPrice", "wholesalePrice", "stock", "minStock", "barcode", "image", "category", "size", "unit", "isActive"],
            data : product
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
