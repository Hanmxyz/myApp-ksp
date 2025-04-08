import { prisma } from "../../server.js"

export default class VendorsRepository {
    
    async getAllVendors() {
        return await prisma.vendor.findMany()
    }

    async getVendorById(id) {
        return await prisma.vendor.findUnique({
            where : ({ id : Number(id)})
        })
    }

    async createVendor(data) {
        return await prisma.vendor.create({
            data :  {
                name : data.name,
                phoneNumber : data.phoneNumber,
                address : data.address,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async updateVendor(id, data) {
        return await prisma.vendor.update({
            where : { id : Number(id)},
            data :  {
                name : data.name,
                phoneNumber : data.phoneNumber,
                address : data.address,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async deleteVendor(id) {
        return await prisma.vendor.delete({
            where : { id : Number(id) }
        })
    }
}