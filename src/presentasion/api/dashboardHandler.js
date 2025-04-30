export default class DashboardHandler{
    constructor(dashboardUsecase) {
        this.dashboardUsecase = dashboardUsecase
    }

    async getDashboards(req,res) {
        try {
            const data = await this.dashboardUsecase.getDashboards()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

}