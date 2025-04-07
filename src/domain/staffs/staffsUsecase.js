import { hashPassword } from "../../lib/passwordHash.js"

export default class StaffsUsecase {
    constructor(staffsRepository) {
        this.staffsRepository = staffsRepository
    }
    async getAllstaffs() {
        return await this.staffsRepository.getAllstaffs()
    }

    async getStaffById(id) {
        return await this.staffsRepository.getStaffById(id)
    }

    async createStaff(data) {

        try {
            const hashedPassword = await hashPassword(data.password)
            const newData = {
                name: data.name,
                phoneNumber: data.phoneNumber,
                username: data.username,
                password: hashedPassword,
                level : data.level,
                isActive: data.isActive.toUpperCase()
            }

            console.log(newData)


            return await this.staffsRepository.createStaff(newData)
        } catch (error) {
            console.log(error)
            throw new Error('failed : ', error.message)
        }
    }

    async updateStaff(id, data) {
        return await this.staffsRepository.updateStaff(id, data)
    }

    async deleteStaff(id) {
        return await this.staffsRepository.deleteStaff(id)
    }
}