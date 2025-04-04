import express from "express"

import SuppliersRepository from "../repositories/suppliersRepository.js"
import SuppliersUsecase from "../domain/suppliers/suppliersUsecase.js"
import SuppliersHandler from "../presentasion/api/suppliersHandler.js"

const router = express.Router()

const suppliersRepository = new SuppliersRepository()
const suppliersUsecase = new SuppliersUsecase(suppliersRepository)
const suppliersHandler = new SuppliersHandler(suppliersUsecase)

router.get("/supplier", (req,res) => {suppliersHandler.getAllSuppliers(req,res)})
router.get("/supplier/:id", (req,res) => {suppliersHandler.getSupplierById(req,res)})
router.post("/supplier", (req,res) => { suppliersHandler.createSupplier(req,res)})
router.put("/supplier/:id", (req,res) => { suppliersHandler.updateSupplier(req,res)})
router.delete("/supplier/:id", (req,res) => {suppliersHandler.deleteSupplier(req,res)})

export default router