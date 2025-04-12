import { prisma } from "../../server.js"

export default class ProductsRepository {
    async getAllProducts() {
        return await prisma.product.findMany({
            include : {
                category : true
            }
        });
    };
    async getProductById(id) {
        return await prisma.product.findUnique({
            where: { id: Number(id) }
        })
    }
    async createProduct(productData) {
        return await prisma.product.create({
            data: {
                name: productData.name,
                purchasePrice: productData.purchasePrice,
                retailPrice: productData.retailPrice,
                wholesalePrice: productData.wholesalePrice,
                stock: productData.stock,
                minStock: productData.minStock,
                barcode: productData.barcode,
                image: productData.image,
                categoryId: productData.categoryId,
                size: productData.size,
                unit: productData.unit,
                isActive: productData.isActive,
                updatedAt: new Date()
            }
        });
    };
    async updateProduct(id, productData) {
        console.log(id)
        console.log(productData)
        return await prisma.product.update({
            where: { id: Number(id) },
            data: productData,
        });
    }
    async deleteProduct(id) {
        return await prisma.product.delete({
            where: { id: Number(id) },
        });
    }
}

