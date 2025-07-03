import { prisma } from "../../server.js"

export default class DueDateRepository {
    async getAllDueDateSetting() {
        return await prisma.dueDateSetting.findMany({
            include: {
                ddsDetail: true
            }
        })
    }

    async getDueDateSettingById(id) {
        return await prisma.dueDateSetting.findUnique({
            where: { id: Number(id) },
            include: {
                ddsDetail: true
            }
        })
    }

    async createDueDateSetting(data) {
        return await prisma.dueDateSetting.create({
            data: {
                year: data.year,
                userId: 1,
                ddsDetail: {
                    create: data.detail.map(item => {
                        return {
                            month: item.month,
                            date: item.date,
                            lateFee: item.lateFee,
                            isActive: item.isActive.toUpperCase()
                        }
                    })

                }
            }
        })
    }

    async updateDueDateSetting(id, data) {
        console.log(data)
        return await prisma.dueDateSetting.update({
            where: { id: Number(id) },
            data: {
                ddsDetail: {
                    update: data.detail.map(item => {
                        return {
                            where : { id : Number(item.id)},
                            data : {
                                month : item.month,
                                date : item.date,
                                lateFee : item.lateFee,
                                isActive : item.isActive.toUpperCase()
                            }
                        }
                    })
                }
            }
        })
    }

    async deleteDueDateSetting(id) {
        return await prisma.dueDateSetting.delete({
            where : { id : Number(id)}
        })
    }

    
}