export default class ReportUsecase {
    constructor(reportRepository) {
        this.reportRepository = reportRepository
    }


    async getAllSales(queryString) {
        const { sale, saleDetails } = await this.reportRepository.getAllSales(queryString)

        const data = sale.map(item => {
            const details = saleDetails.filter(detail => detail.saleId === item.id)
            console.log(details)
            return {
                id: item.id,
                saleDate: item.saleDate,
                nip: item.nip,
                name: item.member.name,
                paymentMetode: item.paymentMetode,
                paymentStatus: item.paymentStatus,
                totalAmount: item.totalAmount,
                details: details
            }
        })

        return data

    }

    async getAllPurchases(queryString) {
        const { purchases, purchaseDetails } = await this.reportRepository.getAllPurchases(queryString)

        const data = purchases.map(item => {
            const details = purchaseDetails.filter(detail => detail.purchaseId === item.id)
            return {
                id: item.id,
                purchaseDate: item.purchaseDate,
                supplier: item.supplier.name,
                totalAmount: item.totalAmount,
                isPaid: item.isPaid,
                details: details
            }
        })

        return data
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
                        status: item.status
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
        console.log(details)
        return {
            id: item.id,
            saleDate: item.saleDate,
            nip: item.nip,
            name: item.member.name,
            paymentMetode: item.paymentMetode,
            paymentStatus: item.paymentStatus,
            totalAmount: item.totalAmount,
            profitKsp : item.profitKsp,
            details: details
        }
    })

    return data
    }

    async getAllOperationalCosts(queryString) {
        return await this.reportRepository.getAllOperationalCosts(queryString)
    }
}