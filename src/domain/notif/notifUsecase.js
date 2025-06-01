

export default class NotifUsecase{
    constructor(notifRepository){
        this.notifRepository = notifRepository
    }

     async getTotalModal() {
        const { stock, product } = await this.notifRepository.getTotalModal()


        const accStock = stock.reduce((acc, item) => {
            return acc + (item.purchasePrice * item.stock )
        }, 0)
        const accProduct = product.reduce((acc, item) => {
            return acc + (item.purchasePrice * item.stock )
        }, 0)

        return {
            total_modal : (accStock + accProduct)
        }
     }
}