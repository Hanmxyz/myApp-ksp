import { prisma } from "../../server.js"

export default class SuppliersRepository{

    async getAllSuppliers() {
        return await prisma.supplier.findMany()
    }

    async getSupplierById(id) {
        return await prisma.supplier.findUnique({
            where : { id : Number(id)}
        })
    }

    async createSupplier(data) {
        return await prisma.supplier.create({
            data : {
                name : data.name,
                address : data.address,
                phoneNumber : data.phoneNumber,
                company : data.company,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async updateSupplier(id,data) {
        return await prisma.supplier.update({
            where : { id : Number(id)},
            data : {
                name : data.name,
                address : data.address,
                phoneNumber : data.phoneNumber,
                company : data.company,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async deleteSupplier(id) {
        return await prisma.supplier.delete({
            where : { id : Number(id)}
        })
    }
}