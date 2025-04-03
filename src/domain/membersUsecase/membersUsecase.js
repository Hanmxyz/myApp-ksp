export default class MembersUsecase{
    constructor(membersRepository) {
        this.membersRepository = membersRepository
    }

    async getAllMembers() {
        return await this.membersRepository.getAllMembers();
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