export default class MembersHandler{
    constructor(membersUsecase) {
        this.membersUsecase = membersUsecase
    }

    async getAllMembers(req, res) {
        try {
            const data = await this.membersUsecase.getAllMembers()
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    }

    async getMemberById(req, res) {
        try {
            const id = req.params.id 
            const data = await this.membersUsecase.getMemberById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createMember(req, res) {
        try {
            const data = req.body
            await this.membersUsecase.createMember(data)
            res.json({message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
    async updateMember(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.membersUsecase.updateMember(id, data)
            res.json({message : true})
        } catch (error) {
            res.status(500).json({message : true})
        }
    }

    async deleteMember(req, res) {
        try {
            const id = req.params.id
            await this.membersUsecase.deleteMember(id)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({message : true})
        }
    }
}