export default class CategoriesHandler {
    constructor(CategoriesUsecase) {
        this.CategoriesUsecase = CategoriesUsecase;
    }

    async getAllCategories(req,res) {
        try {
            const data = await this.CategoriesUsecase.getAllCategories();
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }

    async getCategoryById(req,res) {
        try {
            const id = req.params.id
            const data = await this.CategoriesUsecase.getCategoryById(id);
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }

    async createCategory(req,res) {
        try {
            const data = req.body
            await this.CategoriesUsecase.createCategory(data)
            res.json({message : true})
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }

    async updateCategory(req,res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.CategoriesUsecase.updateCategory(id, data)
            res.json({message: true})
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }

    async deleteCategory(req,res) {
        try {
            const id = req.params.id
            await this.CategoriesUsecase.deleteCategory(id)
            res.json({message: true})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async getProductByCategoryId(req,res) {
        try {
            const id = req.params.id
            const data = await this.CategoriesUsecase.getProductByCategoryId(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }
 }