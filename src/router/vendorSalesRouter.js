import express from "express";

import VendorSalesRepository from "../repositories/vendorSalesRepository.js";
import VendorSalesUsecase from "../domain/vendorSales/vendorSalesUsecase.js";
import VendorSalesHandler from "../presentasion/api/vendorSalesHandler.js";

const router = express.Router()

const vendorSalesRepository = new VendorSalesRepository()
const vendorSalesUsecase = new VendorSalesUsecase(vendorSalesRepository)
const vendorSalesHandler =  new VendorSalesHandler(vendorSalesUsecase)


router.post("/vendorsale", (req,res) => { vendorSalesHandler.createVendorSale(req,res)})

export default router