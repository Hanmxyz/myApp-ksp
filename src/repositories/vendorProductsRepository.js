import { prisma } from "../../server.js"

export default class VendorProductsRepository{
    async getAllVendorProducts() {
        return await prisma.vendorProduct.findMany()
    }

    async getVendorProductById(id) {
        return await prisma.vendorProduct.findUnique({
            where : { id : Number(id)}
        })
    }

    async createVendorProduct(data) {
        return await prisma.vendorProduct.create({
            data : {
                vendorId : data.vendorId,
                name : data.name,
                categoryId : data.categoryId,
                sellPrice : data.sellPrice,
                profitPercent : data.profitPercent,
                entryDate : data.entryDate,
                updatedAt : new Date()
            }
        })
    }

    async updateVendorProduct(id, data) {
        return await prisma.vendorProduct.update({
            where : { id : Number(id)},
            data : {
                vendorId : data.vendorId,
                name : data.name,
                categoryId : data.categoryId,
                sellPrice : data.sellPrice,
                profitPercent : data.profitPercent,
                entryDate : data.entryDate,
                updatedAt : new Date()
            }
        })
    }

    async deleteVendorProduct(id) {
        return await prisma.vendorProduct.delete({
            where : { id : Number(id)}
        })
    }
}