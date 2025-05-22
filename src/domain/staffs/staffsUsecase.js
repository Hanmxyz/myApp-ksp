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
        const password = await hashPassword(data.password)
        const priData = {
            phoneNumber : data.phoneNumber,
            isActive      : data.isActive,
        }

        const secData = {
            name : data.name,
            username : data.username,
            password : password,
            roleId : data.roleId
        }

        return await this.staffsRepository.createStaff(priData,secData)
    }

    async updateStaff(id, data) {
        return await this.staffsRepository.updateStaff(id, data)
    }

    async deleteStaff(id) {
        return await this.staffsRepository.deleteStaff(id)
    }
}