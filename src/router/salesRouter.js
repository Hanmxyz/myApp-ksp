import express from "express";

import SalesRepository from "../repositories/salesRepository.js";
import SalesUsecase from "../domain/sales/salesUsecase.js";
import SalesHandler from "../presentasion/api/salesHandler.js";


const router = express.Router()

const salesRepository = new SalesRepository()
const salesUsecase = new SalesUsecase(salesRepository)
const salesHandler = new SalesHandler(salesUsecase)


router.get("/sale/detail/:id", (req,res) => { salesHandler.getDetailSaleBySaleId(req,res)})
router.get("/sale", (req,res) => { salesHandler.getAllSales(req,res)})
router.post("/sale", (req,res) => {salesHandler.createSale(req,res)})

export default router