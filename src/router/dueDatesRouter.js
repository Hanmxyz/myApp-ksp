import express from "express";

import DueDateRepository from "../repositories/dueDateRepository.js";
import DueDatesUsecase from "../domain/dueDates/dueDatesUsecase.js";
import DueDatesHandler from "../presentasion/api/dueDatesHandler.js";

const router = express.Router()

const dueDateRepository = new DueDateRepository()
const dueDatesUsecase = new DueDatesUsecase(dueDateRepository)
const dueDatesHandler = new DueDatesHandler(dueDatesUsecase)


router.get("/due_date", (req,res) => { dueDatesHandler.getAllDueDateSetting(req,res)})
router.get("/due_date/:id", (req,res) => { dueDatesHandler.getDueDateSettingById(req,res)})
router.post("/due_date",(req,res) => { dueDatesHandler.createDueDateSetting(req,res)})
router.put("/due_date/:id", (req,res) => { dueDatesHandler.updateDueDateSetting(req,res)})
router.delete("/due_date/:id", (req,res) => { dueDatesHandler.deleteDueDateSetting(req,res)})



export default router