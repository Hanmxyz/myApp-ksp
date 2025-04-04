export default class CategoriesUsecase {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    async getAllCategories() {
        return await this.categoriesRepository.getAllCategories();
    }

    async getCategoryById(id) {
        return await this.categoriesRepository.getCategoryById(id);
    }

    async createCategory(category) {
        return await this.categoriesRepository.createCategory(category)
    }
    
    async updateCategory(id, category) {
        return await this.categoriesRepository.updateCategory(id, category)
    }

    async deleteCategory(id) {
        return await this.categoriesRepository.deleteCategory(id)
    }

    async getProductByCategoryId(id) {
        return await this.categoriesRepository.getProductByCategoryId(id)
    }
}