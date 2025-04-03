import express from "express"
import ProductUnitsRepository from "../repositories/productUnitsRepository.js"
import ProductUnitsUsecase from "../domain/productUnits/ProductUnitsUsecase.js"
import ProductUnitsHandler from "../presentasion/api/productUnitsHandler.js"

const router = express.Router()

const productUnitsRepository = new ProductUnitsRepository()
const productUnitsUsecase = new ProductUnitsUsecase(productUnitsRepository)
const productUnitsHandler = new ProductUnitsHandler(productUnitsUsecase)

router.get("/unit", (req,res) => {productUnitsHandler.getAllProductUnits(req,res)})
router.get("/unit/:id", (req,res) => {productUnitsHandler.getProductUnitById(req,res)})
router.post("/unit", (req,res) => {productUnitsHandler.createProductUnit(req,res)})
router.put("/unit/:id", (req,res) => {productUnitsHandler.updateProductUnit(req,res)})
router.delete("/unit/:id", (req,res) => {productUnitsHandler.deleteProductUnit(req,res)})

export default router