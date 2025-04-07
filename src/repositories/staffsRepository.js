import { prisma } from "../../server.js"

export default class StaffsRepository{
    async getAllstaffs() {
        return await prisma.staff.findMany()
    }

    async getStaffById(id) {
        return await prisma.staff.findUnique({
            where : { id : Number(id)}
        })
    }

    async createStaff(data) {
        try {
            return await prisma.staff.create({
                data : {
                    name : data.name,
                    phoneNumber : data.phoneNumber,
                    username : data.username,
                    password : data.password,
                    isActive : data.isActive,
                    level : data.level,
                    updatedAt : new Date()
                }
            })
        } catch (error) {
            throw new Error( error.message )
        }
    }

    async updateStaff(id , data) {
        return await prisma.staff.update({
            where : { id : Number(id)},
            data : {
                name : data.name,
                phoneNumber : data.phoneNumber,
                username : data.username,
                password : data.password,
                isActive : data.isActive,
                level : data.level,
                updatedAt : new Date()
            }
        })
    }

    async deleteStaff(id) {
        return await prisma.staff.delete({
            where : { id : Number(id)}
        })
    }
}