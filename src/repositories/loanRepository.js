import { prisma } from "../../server.js"

export default class LoansRepository {
    
    async getAllLoans() {
        return await prisma.loan.findMany()
    }

    async getLoansById(id){
        return await prisma.loan.findUnique({
            where : { id : Number(id)}
        })
    }

    async createLoan(data) {
        return await prisma.loan.create({
            data : {
                year : data.year,
                nip : data.nip,
                loanAmount : data.loanAmount,
                loanTerm : data.loanTerm,
                monthlyPayment : data.monthlyPayment,
                userId: 1
            }
        })
    }

    async updateLoan(id, data) {
        return await prisma.loan.update({
            where : { id : Number(id)},
            data : data
        })
    }

    async deleteLoan(id) {
        return await prisma.loan.delete({
            where : { id : Number(id)}
        })
    }
}