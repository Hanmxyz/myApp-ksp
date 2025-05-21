import { prisma } from "../../server.js"

export default class PaymentVendorSaleRepository {


    async getDetailVendorSale() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return await prisma.vendorSaleDetail.findMany({
            where: {
                createdAt : {
                    gte: today,
                    lt: tomorrow,
                  },
            },
            include : {
                vendorProduct : true
            }
        })
    }

    async getVendorPayment(vendorId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return await prisma.paymentVendorSale.findFirst({
            where: {
                vendorId : Number(vendorId),
                paymentDate : {
                    gte: today,
                    lt: tomorrow,
                  },
            }
        })
    }

    async getAllVendorPayment() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const payment =  await prisma.paymentVendorSale.findMany({
            where: {
                paymentDate : {
                    gte: today,
                    lt: tomorrow,
                  },
            }
        })
        const vendor = await prisma.vendorSale.findMany()
        return { payment, vendor}
    }

    async createPaymentVendorSale(data) {
        return await prisma.paymentVendorSale.create({
            data : {
                vendorId : data.vendorId,
                paymentTotal : data.paymentTotal,
                status : "belum_lunas"
            }
        })
    }

    async updateTotalVendorSale(vendorId, paymentTotal) { 
        const vendor = await prisma.paymentVendorSale.findFirst({
            where : { vendorId : Number(vendorId)},
            orderBy : { id : "desc" }
        })
        return await prisma.paymentVendorSale.update({
            where : { id : Number(vendor.id) },
            data : {
                paymentTotal : paymentTotal
            }
        })
    }

    async updatePaymentVendorSale(id, data){
        return await prisma.paymentVendorSale.update({
            where : { id : Number(id)},
            data : {
                status : data.status
            }
        })
    }
}