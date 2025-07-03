export default class DueDatesUsecase {
    constructor(dueDatesRepository) {
        this.dueDatesRepository = dueDatesRepository
    }

    async getAllDueDateSetting() {
        const data = await this.dueDatesRepository.getAllDueDateSetting()
        const newData = data.map(component => {
            return {
                id: component.id,
                year: component.year,
                userId: component.userId,
                lateFee: component.ddsDetail[0].lateFee,
                isActive: component.ddsDetail[0].isActive,
                detail: component.ddsDetail.map(item => {
                    return {
                        id: item.id,
                        month: item.month,
                        date: item.date
                    }
                })
            }
        })

        return newData
    }

    async getDueDateSettingById(id) {
        const data = await this.dueDatesRepository.getDueDateSettingById(id)

        const newData = {
            id: data.id,
            year: data.year,
            userId: data.userId,
            lateFee: data.ddsDetail[0].lateFee,
            isActive: data.ddsDetail[0].isActive,
            detail: data.ddsDetail.map(item => {
                return {
                    id: item.id,
                    month: item.month,
                    date: item.date
                }
            })
        }

        return newData
    }

    async createDueDateSetting(data) {
        const newData = {
            year: data.year,
            detail: data.detail.map(item => {
                return {
                    month: item.month,
                    date: item.date,
                    lateFee: data.lateFee,
                    isActive: data.isActive
                }
            })
        }
        return await this.dueDatesRepository.createDueDateSetting(newData)
    }

    async updateDueDateSetting(id, data) {
        const newData = {
            year: data.year,
            detail: data.detail.map(item => {
                return {
                    id : item.id,
                    month: item.month,
                    date: item.date,
                    lateFee: data.lateFee,
                    isActive: data.isActive
                }
            })
        }
        return await this.dueDatesRepository.updateDueDateSetting(id, newData)
    }

    async deleteDueDateSetting(id) {
        return await this.dueDatesRepository.deleteDueDateSetting(id)
    }
}