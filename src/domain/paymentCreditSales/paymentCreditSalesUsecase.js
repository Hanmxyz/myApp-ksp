export default class PaymentCreditSalesUsecase{
    constructor(paymentCreditSaleRepository) {
        this.paymentCreditSaleRepository = paymentCreditSaleRepository
    }

    async getAllCreditMemberPerMonth(queryString) {
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
        const data = await this.paymentCreditSaleRepository.getAllCreditMemberPerMonth(queryString)
        const newData = accumulatePayments(data)
        return newData
    }

    async getCreditMemberByNip(nip) {
        const data = await this.paymentCreditSaleRepository.getCreditMemberByNip(nip)
        const merge = data.reduce((acc,curr) => {
            return acc + curr.paymentTotal
        },0) 
        const newData  = {
            name : data[0].member.name,
            totalAmount : merge,
            status : "cicilan",
            detail : data.map( p => ({
                vendorSaleId : p.vendorSaleId,
                paymentDate : p.paymentDate,
                paymentTotal : p.paymentTotal,
                status : p.status

            }))
        }

        return newData
    }

    async updateCreditMember(total,nip) {
        const nominal = total.nominal
        const data = await this.paymentCreditSaleRepository.getCreditMemberByNip(nip)

        function updateTotalandDistribute(data, nominal) {
            const sortedData = data.sort((a,b) => a.id - b.id)
            let remainingAmount = nominal

            const updatedCredit = []

            for (const item of sortedData) {
                const amountToReduce = Math.min(remainingAmount, item.paymentTotal)
                const newPaymentTotal = Math.max(0, item.paymentTotal - amountToReduce )
                updatedCredit.push({id : item.id, paymentTotal : newPaymentTotal, status : (newPaymentTotal === 0 ? "lunas" : "cicilan")})
                remainingAmount -= amountToReduce;
                if (remainingAmount <= 0) {
                    break;
                }
                return updatedCredit
            }
        }

        const result = updateTotalandDistribute(data, nominal)
        return await this.paymentCreditSaleRepository.updateCreditMember(result)
    }

    async updateCreditMemberByNipPerMonth(data, queryString) {
        return this.paymentCreditSaleRepository.updateCreditMemberByNipPerMonth(data,queryString)
    }
}