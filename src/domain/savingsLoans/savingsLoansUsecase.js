export default class SavingsLoansUsecase {
    constructor(savingsLoansRepository) {
        this.savingsLoansRepository = savingsLoansRepository
    }

    async getAllSavingsLoans() {
        return await this.savingsLoansRepository.getAllSavingsLoans()
    }

    async getSavingsLoansById(id) {
        return await this.savingsLoansRepository.getSavingsLoansById(id)
    }

    async createSavingsLoans(data) {
        return await this.savingsLoansRepository.createSavingsLoans(data)
    }

    async updateSavingsLoans(year, data) {
        return await this.savingsLoansRepository.updateSavingsLoans(year, data)
    }

    async deleteSavingsLoans(year) {
        return await this.savingsLoansRepository.deleteSavingsLoans(year)
    }

}