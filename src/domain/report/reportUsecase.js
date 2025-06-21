import { toWIB } from "../../lib/convertDate.js"

export default class ReportUsecase {
    constructor(reportRepository) {
        this.reportRepository = reportRepository
    }


    async getAllSales(queryString) {
        const { sale, saleDetails } = await this.reportRepository.getAllSales(queryString)

        const data = sale.map(item => {
            const details = saleDetails.filter(detail => detail.saleId === item.id)
            return {
                id: item.id,
                saleDate: toWIB(item.saleDate),
                nip: item.nip,
                name: item.member.name,
                paymentMetode: item.paymentMetode,
                paymentStatus: item.paymentStatus,
                totalAmount: item.totalAmount,
                totalPayment: item.totalPayment,
                change: item.change,
                details: details
            }
        })

        console.log(saleDetails)
        const newData = {
            total : await data.reduce((cur, item) => cur += parseInt(item.totalAmount), 0),
            profit : await saleDetails.reduce((cur, item) => cur += parseInt(item.salePrice - item.purchasePrice), 0),
            data : data
        }

        return newData
    }

    async getAllPurchases(queryString) {
        const { purchases, purchaseDetails } = await this.reportRepository.getAllPurchases(queryString)

        const data = purchases.map(item => {
            const details = purchaseDetails.filter(detail => detail.purchaseId === item.id)
            return {
                id: item.id,
                purchaseDate: toWIB(item.purchaseDate),
                supplier: item.supplier.name,
                totalAmount: item.totalAmount,
                isPaid: item.isPaid,
                details: details
            }
        })

        const newData = {
            total : await data.reduce((cur, item) => cur += parseInt(item.totalAmount), 0),
            data : data
        }

        return newData
    }

    async getAllCredits(queryString) {
        const { creditSale, creditVendorSale } = await this.reportRepository.getAllCredits(queryString)
        const combined = [...creditSale, ...creditVendorSale]
        function accumulatePayments(data) {
            const result = [];

            // Iterate over the data to accumulate payments based on 'nip'
            data.forEach(item => {
                // Find existing record for the same 'nip'
                let existing = result.find(record => record.nip === item.nip);

                if (existing) {
                    // If record exists, accumulate payment
                    existing.paymentTotal += item.paymentTotal;
                } else {
                    // If record doesn't exist, create a new record
                    result.push({
                        id: result.length + 1, // Generate new ID
                        nip: item.nip,
                        name: item.member.name,
                        bank: item.member.bank,
                        accountNumber: item.member.accountNumber,
                        paymentTotal: item.paymentTotal,
                        status: item.status === "cicilan" ? "piutang" : "lunas"
                    });
                }
            });

            return result;
        }
        const data = accumulatePayments(combined)
        return data
    }

    async getAllVendorSales(queryString) {
      const { vendorSale , vendorSaleDetail } = await this.reportRepository.getAllVendorSales(queryString)
      const data = vendorSale.map(item => {
        const details = vendorSaleDetail.filter(detail => detail.vendorSaleId === item.id)
        return {
            id: item.id,
            saleDate: toWIB(item.saleDate),
            nip: item.nip,
            name: item.member.name,
            paymentMetode: item.paymentMetode,
            paymentStatus: item.paymentStatus,
            totalAmount: item.totalAmount,
            profitKsp : item.profitKsp,
            details: details
        }
    })

    const newData = {
            total : await data.reduce((cur, item) => cur += parseInt(item.totalAmount), 0),
            profit : await data.reduce((cur, item) => cur += parseInt(item.profitKsp), 0),
            data : data
        }

        return newData
    }

    async getAllOperationalCosts(queryString) {
        return await this.reportRepository.getAllOperationalCosts(queryString)
    }

    async getAllPaymentVendors(queryString) {
        const { payment, vendor } = await this.reportRepository.getAllPaymentVendors(queryString)

        const data = payment.map( item => {
            const name = vendor.find( i => i.id === item.vendorId)
            return {
                id : item.id,
                date : toWIB(item.paymentDate),
                name : name.name,
                total : item.paymentTotal,
                status : item.status
            }
        })

        return data
    }
}