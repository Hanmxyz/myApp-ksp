import { prisma } from "../../server.js"

export default class OperationalCostsRepository{

    async getAllOperationalCosts() {
        return await prisma.operationalCost.findMany()
    }

    async createOperationalCost(data) {
        return await prisma.operationalCost.create({
            data : {
                staff : data.staff,
                description : data.description,
                cost : data.cost
            }
        })
    }

    async updateOperatinalCost(data, id) {
        return await prisma.operationalCost.update({
            where : { id : Number(id)},
            data : {
                staff : data.staff,
                description : data.description,
                cost : data.cost
            }
        })
    }

    async deleteOperationalCost(id) {
        return await prisma.operationalCost.delete({
            where :  { id : Number(id)}
        })
    }

}