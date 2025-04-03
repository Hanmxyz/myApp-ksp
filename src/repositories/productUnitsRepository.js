import { prisma } from "../../server.js"

export default class ProductUnitRepository{
    async getAllProductUnits() {
        return await prisma.productUnit.findMany();
    }

    async getProductUnitById(id) {
        return await prisma.productUnit.findUnique({
            where : { id: Number(id) }
        })
    }

    async createProductUnit(unit) {
        return await prisma.productUnit.create({
            data : {
                name : unit.name,
                isActive : unit.isActive,
                updatedAt : new Date()
            }
        })
    }

    async updateProductUnit(id, unit) {
        return await prisma.productUnit.update({
            where : { id : Number(id)},
            data : {
                name : unit.name,
                isActive : unit.isActive,
                updatedAt : new Date()
            }
        })
    }

    async deleteProductUnit(id) {
        return await prisma.productUnit.delete({
            where : { id : Number(id)}
        })
    }
}