export default class MembersUsecase{
    constructor(membersRepository) {
        this.membersRepository = membersRepository
    }

    async getAllMembers() {
        const data = await this.membersRepository.getAllMembers();
        const member = data.map( p => {
            return {
                nip : p.nip,
                name : p.name,
                accountNumber : p.accountNumber,
                bank : p.bank,
                phoneNumber : p.phoneNumber,
                address : p.address,
                creditLimit : p.creditLimit,
                isActive : p.isActive
            }
        })
        const newData = {
            title : "member",
            header : ["nip", "name", "accountNumber", "bank", "phoneNumber", "address", "creditLimit", "isActive"],
            data : member
        }

        return newData
    }

    async getMemberById(id) {
        return await this.membersRepository.getMemberById(id)
    }

    async createMember(data) {
        return await this.membersRepository.createMember(data)
    }
    async updateMember(id, data) {
        return await this.membersRepository.updateMember(id, data)
    }

    async deleteMember(id) {
        return await this.membersRepository.deleteMember(id)
    }
}