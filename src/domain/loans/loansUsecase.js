export default class LoansUsecase {
    constructor(loansRepository) {
        this.loansRepository = loansRepository
    }

    async getAllLoans() {
        return await this.loansRepository.getAllLoans()
    }

    async getLoansById(id) {
        return await this.loansRepository.getLoansById(id)
    }

    async createLoan(data) {
        return await this.loansRepository.createLoam(data)
    }

    async updateLoan(id, data) {
        return await this.loansRepository.updateLoan(id, data)
    }

    async deleteLoan(id) {
        return await this.loansRepository.deleteLoan(id)
    }
}