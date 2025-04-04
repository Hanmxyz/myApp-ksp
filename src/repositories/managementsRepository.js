import { prisma } from "../../server.js"

export default class ManagementRepository {
    
    async getAllManagemets() {
        return await prisma.management.findMany()
    }

    async getManagementById(id) {
        return await prisma.management.findUnique({
            where : { id : Number(id) }
        })
    }

    async createManagement(data) {
        return await prisma.management.create({
            data : {
                name : data.name,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async updateManagement(id, data) {
        return await prisma.management.update({
            where : { id : Number(id)},
            data : {
                name : data.name,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async deleteManagement(id) {
        return await prisma.management.delete({
            where : { id : Number(id) }
        })
    }
}