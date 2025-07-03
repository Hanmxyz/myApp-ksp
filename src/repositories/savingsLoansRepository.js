import { prisma } from "../../server.js"

export default class SavingsLoansRepository {

    async getAllSavingsLoans() {
        return await prisma.savingsLoansSetting.findMany()
    }

    async getSavingsLoansById(id) {
        return await prisma.savingsLoansSetting.findUnique({
            where: { year: Number(id) }
        })
    }

    async createSavingsLoans(data) {
        return await prisma.savingsLoansSetting.create({
            data: {
                year: Number(data.year),
                shuSaving: Number(data.shuSaving),
                basicSaving: Number(data.basicSaving),
                mandatorySaving: Number(data.mandatorySaving),
                memberLoanIR: parseFloat(data.memberLoanIR),
                managementLoanIR: parseFloat(data.managementLoanIR),
                isActive: data.isActive,
                userId: 1
            }
        })
    }

    async updateSavingsLoans(year, data) {
        return await prisma.savingsLoansSetting.update({
            where: { year: Number(year) },
            data: {
                shuSaving: Number(data.shuSaving),
                basicSaving: Number(data.basicSaving),
                mandatorySaving: Number(data.mandatorySaving),
                memberLoanIR: parseFloat(data.memberLoanIR),
                managementLoanIR: parseFloat(data.managementLoanIR),
                isActive: data.isActive,
                userId: 1
            }
        })
    }

    async deleteSavingsLoans(year) {
        return await prisma.savingsLoansSetting.delete({
            where : {
                year : Number(year)
            }
        })
    }


}