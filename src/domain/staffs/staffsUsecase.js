import { hashPassword } from "../../lib/passwordHash.js"

export default class StaffsUsecase {
    constructor(staffsRepository) {
        this.staffsRepository = staffsRepository
    }
    async getAllstaffs() {
        const data =await this.staffsRepository.getAllstaffs()
        const staff = data.map( p => {
            return {
                id : p.id,
                name : p.name,
                phoneNumber : p.phoneNumber,
                username : p.username,
                password : p.password,
                isActive : p.isActive ,
                level : p.level
            }
        })
        const newData = {
            title : "staff",
            header :["id","name","phoneNumber", "username", "password", "isActive", "level"],
            data : staff
        }

        return newData
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



            return await this.staffsRepository.createStaff(newData)
        } catch (error) {
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