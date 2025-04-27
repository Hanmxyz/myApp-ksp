import express from "express";

import OperationalCostsRepository from "../repositories/operationalCostsRepository.js";
import OperationalCostsUsecase from "../domain/operationalCosts/operationalCostsUsecase.js";
import OperationalCostsHandler from "../presentasion/api/operationalCostsHandler.js";

const router = express.Router()

const operationalCostsRepository = new OperationalCostsRepository()
const operationalCostsUsecase = new OperationalCostsUsecase(operationalCostsRepository)
const operationalCostsHandler = new OperationalCostsHandler(operationalCostsUsecase)


router.get("/opcost", (req,res) => {operationalCostsHandler.getAllOperationalCosts(req,res)})
router.post("/opcost", (req,res) => {operationalCostsHandler.createOperationalCost(req,res)})
router.put("/opcost/:id", (req,res) => { operationalCostsHandler.updateOperatinalCost(req,res)})
router.delete("/opcost/:id", (req,res) => { operationalCostsHandler.deleteOperationalCost(req,res)})


export default router