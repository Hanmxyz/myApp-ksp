import { prisma } from "../../server";

export class CategoriesRepository {
    async getAllCategories() {
        return await prisma.category.findMany();
    }

    async getCategoryById(id) {
        return await prisma.category.findUnique({
            where : {id : Number(id) }
        })
    }

    async createCategory(categoryData) {
        return await prisma.category.create({
            data: {
                name: categoryData.name,
                isActive: categoryData.isActive,
                updatedAt: new Date()
            }
        })
    }
    
    async updateCategory(id, categoryData) {
        return await prisma.category.update({
            where: {id: Number(id)},
            data: {
                name: categoryData.name,
                isActive: categoryData.isActive,
                updatedAt: new Date()
            }
        })
    }

    async deleteCategory(id) {
        return await prisma.category.delete({
            where: {id: Number(id)}
        })
    }
}