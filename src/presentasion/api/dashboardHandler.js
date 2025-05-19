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

    async getChartDashboard(req,res) {
        try {
            const queryString = req.query
            const data = await this.dashboardUsecase.getChartDashboard(queryString)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getTopLoyalMemberLeader(req,res) {
        try {
            const data = await this.dashboardUsecase.getTopLoyalMemberLeader()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }

    }

}