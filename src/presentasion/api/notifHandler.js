export default class NotifHandler {
    constructor(notifUsecase){
        this.notifUsecase = notifUsecase
    }

     async getTotalModal(req,res) {
        try {
            const data = await this.notifUsecase.getTotalModal()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
     }
}