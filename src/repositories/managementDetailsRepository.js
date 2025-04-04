import { prisma } from "../../server.js"

export default class ManagementDetailsRepository{

    async getAllManagementDetails() {
        return await prisma.managementDetail.findMany();
    }

    async getManagementDetailById(id) {
        return await prisma.managementDetail.findUnique({
            where : { id : Number(id)}
        })
    }

    async createManagementDetail(data) {
        return await prisma.managementDetail.create({
            data : {
                year : data.year,
                nip : data.nip,
                startDate : data.startDate,
                endDate : data.endDate,
                allowance : data.allowance,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }
    async updateManagementDetail(id, data) {
        return await prisma.managementDetail.update({
            where : { id : Number(id)},
            data : {
                year : data.year,
                nip : data.nip,
                startDate : data.startDate,
                endDate : data.endDate,
                allowance : data.allowance,
                isActive : data.isActive,
                updatedAt : new Date()
            }
        })
    }

    async deleteManagementDetail(id) {
        return await prisma.managementDetail.delete({
            where : { id : Number(id)}
        })
    }
}