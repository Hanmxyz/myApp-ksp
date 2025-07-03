export default class DueDatesHandler {
    constructor(dueDatesUsecase) {
        this.dueDatesUsecase = dueDatesUsecase
    }

    async getAllDueDateSetting(req,res) {
        try {
           const data = await this.dueDatesUsecase.getAllDueDateSetting()
           res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getDueDateSettingById(req,res) {
       try {
            const id = req.params.id
            const data = await this.dueDatesUsecase.getDueDateSettingById(id)
            res.json(data)
       } catch (error) {
            res.status(500).json({ message : error.message })
       }
    }

    async createDueDateSetting(req,res) {
        try {
            const data = req.body
            const result = await this.dueDatesUsecase.createDueDateSetting(data)
            res.json({ message : true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateDueDateSetting(req,res) {
        try {
            const data = req.body
            const id = req.params.id
            const result = await this.dueDatesUsecase.updateDueDateSetting(id,data)
            res.json({ message: true, data : result})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async deleteDueDateSetting(id) {
        return await this.dueDatesRepository.deleteDueDateSetting(id)
    }
}