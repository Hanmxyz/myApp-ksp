import express from "express";

import ReportRepository from "../repositories/reportRepository.js";
import ReportUsecase from "../domain/reportUsecase/reportUsecase.js";
import ReportHandler from "../presentasion/api/reportHandler.js";


const router = express.Router()

const reportRepository = new ReportRepository()
const reportUsecase = new ReportUsecase(reportRepository)
const reportHandler = new ReportHandler(reportUsecase)

router.get("/report/sale" , (req,res) => { reportHandler.getAllSales(req,res)})
router.get("/report/purchase" , (req,res) => { reportHandler.getAllPurchases(req,res)})
router.get("/report/credit" , (req,res) => { reportHandler.getAllCredits(req,res)})
router.get("/report/vendorsale" , (req,res) => { reportHandler.getAllVendorSales(req,res)})
router.get("/report/opcost" , (req,res) => { reportHandler.getAllOperationalCosts(req,res)})


export default router