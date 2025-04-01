class ProductsUsecase {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }

    async getAllProducts() {
        return await this.productsRepository.getAllProducts();
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
