export default class PaymentCreditVendorSalesUsecase{
    constructor(paymentCreditVendorSaleRepository){
        this.paymentCreditVendorSaleRepository = paymentCreditVendorSaleRepository
    }

    async getAllCreditMember() {
        const data = await this.paymentCreditVendorSaleRepository.getAllCreditMember()

        const newData = data.filter(item => item.nip !== "0000000000" )

        return newData
    }

    async getCreditMemberByNip(nip) {
        const data = await this.paymentCreditVendorSaleRepository.getCreditMemberByNip(nip)
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

    async updateCreditMember(total, nip) {
        const nominal = total.nominal
        const data = await this.paymentCreditVendorSaleRepository.getCreditMemberByNip(nip)

        function updateTotalandDistribute(data, nominal) {
            const sortedData = data.sort((a,b) => a.id - b.id);
            // console.log(sortedData)
            let remainingAmount = nominal
            // console.log(remainingAmount)
            const updatedCredit = []

            for (const item of sortedData) {
                const amountToReduce = Math.min(remainingAmount, item.paymentTotal)
                // console.log(amountToReduce)
                const newPaymentTotal = Math.max(0, item.paymentTotal - amountToReduce)
                updatedCredit.push({id: item.id, paymentTotal : newPaymentTotal, status : (newPaymentTotal === 0 ? "lunas" : "cicilan")})
                remainingAmount -= amountToReduce;
                if (remainingAmount <= 0) {
                    break;
                }
            }
            return updatedCredit
        }

        const result = updateTotalandDistribute(data, nominal)
        // console.log(result)
        return await this.paymentCreditVendorSaleRepository.updateCreditMember(result)
    }
}