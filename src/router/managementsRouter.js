import express from "express"

import ManagementRepository from "../repositories/managementsRepository.js"
import ManagementsUsecase from "../domain/managements/managementsUsecase.js"
import ManagementsHandler from "../presentasion/api/managementsHandler.js"

const router = express.Router()

const managementsRepository = new ManagementRepository()
const managementsUsecase = new ManagementsUsecase(managementsRepository)
const managementsHandler = new ManagementsHandler(managementsUsecase)

router.get("/management", (req, res) => {managementsHandler.getAllManagemets(req,res)})
router.get("/management/:id", (req,res) => {managementsHandler.getManagementById(req,res)})
router.post("/management", (req,res) => {managementsHandler.createManagement(req,res)})
router.put("/management/:id", (req,res) => {managementsHandler.updateManagement(req,res)})
router.delete("/management/:id", (req,res) => {managementsHandler.deleteManagement(req,res)})


export default router