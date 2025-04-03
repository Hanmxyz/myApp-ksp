import { prisma } from "../../server.js"

export default class MembersRepository {
    async getAllMembers() {
        return await prisma.member.findMany()
    }

    async getMemberById(id) {
        return await prisma.member.findUnique({
            where : { nip : String(id)}
        })
    }

    async createMember(data) {
        return await prisma.member.create({
            data : {
                nip : data.nip,
                name : data.name,
                accountNumber : data.accountNumber,
                bank : data.bank,
                phoneNumber :  data.phoneNumber,
                address : data.address,
                creditLimit : data.creditLimit,
                isActive : data.isActive,
                updatedAt : new Date()  
            }
        })
    }
    async updateMember(id, data) {
        console.log(data)
        return await prisma.member.update({
            where : { nip : String(id) },
            data : {
                name : data.name,
                accountNumber : data.accountNumber,
                bank : data.bank,
                phoneNumber :  data.phoneNumber,
                address : data.address,
                creditLimit : data.creditLimit,
                isActive : data.isActive,
                updatedAt : new Date()  
            }
        }) 
    }

    async deleteMember(id) {
        return await prisma.member.delete({
            where : { nip : String(id)}
        })
    }
}