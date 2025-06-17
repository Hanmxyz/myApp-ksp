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
                name : p.user.name,
                phoneNumber : p.phoneNumber,
                username : p.user.username,
                password : p.user.password,
                isActive : p.isActive ,
                role : p.user.role.name
            }
        })
        const newData = {
            data : staff
        }

        return newData
    }

    async getStaffById(id) {
        const data = await this.staffsRepository.getStaffById(id)
        
         return {
                id : data.id,
                name : data.user.name,
                phoneNumber : data.phoneNumber,
                username : data.user.username,
                password : data.user.password,
                isActive : data.isActive ,
                role : data.user.role.name
            }
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

        const password = await hashPassword(data.password)
        const newData = {
            phoneNumber : data.phoneNumber,
            name : data.name,
            isActive : data.isActive,
            username : data.username,
            password : password,
            roleId : data.roleId

        }

        return await this.staffsRepository.updateStaff(id, newData)
    }

    async deleteStaff(id) {
        return await this.staffsRepository.deleteStaff(id)
    }
}