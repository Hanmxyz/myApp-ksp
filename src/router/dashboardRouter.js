import express from "express";

import DashboardRepository from "../repositories/dashboardRepository.js";
import DashboardUsecase from "../domain/dashboards/dahsboardUsecase.js";
import DashboardHandler from "../presentasion/api/dashboardHandler.js";
import AuthMiddleware from "../presentasion/api/authMiddleware.js";

const router = express.Router()
const dashboardRepository = new DashboardRepository()
const dashboardUsecase = new DashboardUsecase(dashboardRepository)
const dashboardHandler = new DashboardHandler(dashboardUsecase)

router.get("/dashboard", AuthMiddleware,(req,res) => { dashboardHandler.getDashboards(req,res)})
router.get("/dashboard/chart" , AuthMiddleware, (req,res) => { dashboardHandler.getChartDashboard(req,res)})


export default router