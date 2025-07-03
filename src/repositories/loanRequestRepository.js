import { prisma } from "../../server.js";

export default class LoanRequestRepository{
    async getAllLoanRequests() {
        return await prisma.loanRequest.findMany()
    }

    async getLoanRequestById(id) {
        return await prisma.loanRequest.findUnique({
            where : { id : Number(id)}
        })
    }

    async createLoanRequest(data) {
        return await prisma.loanRequest.create({
            data : {
                nip : data.nip,
                loanTerm : Number(data.loanTerm),
                loanAmount : parseFloat(data.loanAmount),
                description : data.description,
                userId : 1
            }
        })
    }

    async updateLoanRequestStatus(id, data) {
        console.log(id)
         return await prisma.loanRequest.update({
            where : { id : Number(id)},
            data : {
                status : data.status,
                userId : 1
            }
        })
    }

    async deleteLoanRequest(id) {
        return await prisma.loanRequest.delete({
            where : { id : Number(id)}
        })
    }
}