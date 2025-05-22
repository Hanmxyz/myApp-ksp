import { prisma } from "../../server.js"

export default class StaffsRepository {
    async getAllstaffs() {
        return await prisma.staff.findMany()
    }

    async getStaffById(id) {
        return await prisma.staff.findUnique({
            where: { id: Number(id) },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        })
    }

    async createStaff(priData, secData) {
        try {

            const role = await prisma.role.findUnique({ where: { id: secData.roleId } });
            if (!role) {
                throw new Error('Role not found');
            }
            const username = await prisma.user.findUnique({ where: { username: secData.username } });
            if (username) {
                throw new Error('username sudah ada');
            }
            return await prisma.staff.create({
                data: {
                    phoneNumber: priData.phoneNumber,
                    isActive: priData.isActive,
                    updatedAt: new Date(),
                    user: {
                        create: {
                            name: secData.name,
                            username: secData.username,
                            password: secData.password,
                            roleId: secData.roleId
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateStaff(id, data) {
        return await prisma.staff.update({
            where: { id: Number(id) },
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                username: data.username,
                password: data.password,
                isActive: data.isActive,
                level: data.level,
                updatedAt: new Date()
            }
        })
    }

    async deleteStaff(id) {
        return await prisma.staff.delete({
            where: { id: Number(id) }
        })
    }
}