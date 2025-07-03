import LoanRepository from "../../repositories/loanRepository.js"

export default class LoanRequestUsecase {
    constructor(loanRequestRepository) {
        this.loanRequestRepository =  loanRequestRepository
        this.LoanRepository = new LoanRepository()
    }

    async getAllLoanRequests() {
        return await this.loanRequestRepository.getAllLoanRequests()
    }

    async getLoanRequestById(id) {
        return await this.loanRequestRepository.getLoanRequestById(id)
    }

    async createLoanRequest(data) {
        return await this.loanRequestRepository.createLoanRequest(data)
    }

    async updateLoanRequestStatus(id, data) {
        const newData =  await this.loanRequestRepository.updateLoanRequestStatus(id, data)
        const ir = 1.5
        const date = new Date(newData.createdAt)
        console.log(newData)
        if(newData.status === "accepted") {
            const dataAcc = {
                year : date.getFullYear(),
                nip  : newData.nip,
                loanAmount : newData.loanAmount,
                loanTerm : newData.loanTerm,
                monthlyPayment : Math.floor((((ir * newData.loanTerm)/100 * newData.loanAmount) + newData.loanAmount)/newData.loanTerm), 
            }
            console.log(dataAcc)
            await this.LoanRepository.createLoan(dataAcc)
        }
        return newData
    }

    async deleteLoanRequest(id) {
        return await this.loanRequestRepository.deleteLoanRequest(id)
    }
}