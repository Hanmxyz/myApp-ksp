import express from "express"

import ManagementDetailsRepository from "../repositories/managementDetailsRepository.js"
import ManagementDetailsUsecase from "../domain/managementDetails/managementDetailsUsecase.js"
import ManagementDetailsHandler from "../presentasion/api/managementDetailsHandler.js"

const router = express.Router()

const managementDetailsRepository = new ManagementDetailsRepository()
const managementDetailsUsecase = new ManagementDetailsUsecase(managementDetailsRepository)
const managementDetailsHandler = new ManagementDetailsHandler(managementDetailsUsecase)

router.get("/managementDetail", (req,res) => { managementDetailsHandler.getAllManagementDetails(req,res)})
router.get("/managementDetail/:id", (req,res) => { managementDetailsHandler.getManagementDetailById(req,res)})
router.post("/managementDetail", (req,res) => { managementDetailsHandler.createManagementDetail(req,res)})
router.put("/managementDetail/:id", (req,res) => { managementDetailsHandler.updateManagementDetail(req,res)})
router.delete("/managementDetail/:id", (req,res) => { managementDetailsHandler.deleteManagementDetail(req,res)})

export default router