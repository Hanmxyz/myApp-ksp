import express from "express";

import VendorsRepository from "../repositories/vendorsRepository.js";
import VendorsUsecase from "../domain/vendors/vendorsUsecase.js";
import VendorsHandler from "../presentasion/api/vendorsHandler.js";


const router = express.Router()

const vendorsRepository = new VendorsRepository()
const vendorsUsecase = new VendorsUsecase(vendorsRepository)
const vendorsHandler = new VendorsHandler(vendorsUsecase)


router.get("/vendor", (req,res) => { vendorsHandler.getAllVendors(req,res)})
router.get("/vendor/:id", (req,res) => { vendorsHandler.getVendorById(req,res)})
router.post("/vendor", (req,res) => { vendorsHandler.createVendor(req,res)})
router.put("/vendor/:id", (req,res) => { vendorsHandler.updateVendor(req,res)})
router.delete("/vendor/:id", (req,res) => { vendorsHandler.deleteVendor(req,res)})

export default router