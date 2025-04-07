 import express from "express";

 import StaffsRepository from "../repositories/staffsRepository.js";
 import StaffsUsecase from "../domain/staffs/staffsUsecase.js";
 import StaffsHandler from "../presentasion/api/staffsHandler.js";

 const router = express.Router()

 const staffsRepository = new StaffsRepository()
 const staffsUsecase = new StaffsUsecase(staffsRepository)
 const staffsHandler = new StaffsHandler(staffsUsecase)


 router.get("/staff", (req,res) => {staffsHandler.getAllstaffs(req,res)}) 
 router.get("/staff/:id", (req,res) => {staffsHandler.getStaffById(req,res)})
 router.post("/staff", (req,res) => { staffsHandler.createStaff(req,res)})
 router.put("/staff/:id", (req,res) => { staffsHandler.updateStaff(req,res)})
 router.delete("/staff/:id", (req,res) => { staffsHandler.deleteStaff(req,res)})
 
 export default router 