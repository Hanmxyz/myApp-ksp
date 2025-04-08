import express from "express";

import VendorProductsRepository from "../repositories/vendorProductsRepository.js";
import VendorProductsUsecase from "../domain/vendorProducts/vendorProductsUsecase.js";
import VendorProductsHandler from "../presentasion/api/vendorProductsHandler.js";

const router = express.Router()

const vendorProductsRepository = new VendorProductsRepository()
const vendorProductsUsecase = new VendorProductsUsecase(vendorProductsRepository)
const vendorProductsHandler = new VendorProductsHandler(vendorProductsUsecase)

router.get("/vendor_product", (req,res) => { vendorProductsHandler.getAllVendorProducts(req,res)})
router.get("/vendor_product/:id", (req,res) => { vendorProductsHandler.getVendorProductById(req,res)})
router.post("/vendor_product", (req,res) => { vendorProductsHandler.createVendorProduct(req,res)})
router.put("/vendor_product/:id", (req,res) => { vendorProductsHandler.updateVendorProduct(req,res)})
router.delete("/vendor_product/:id", (req,res) => { vendorProductsHandler.deleteVendorProduct(req,res)})



export default router