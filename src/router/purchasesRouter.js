import express from "express";

import PurchasesRepository from "../repositories/purchasesRepositoty.js";
import PurchasesUsecase from "../domain/purchases/purchasesUsecase.js";
import PurchasesHandler from "../presentasion/api/purchasesHandler.js";

const router = express.Router()

const purchasesRepository = new PurchasesRepository()
const purchasesUsecase = new PurchasesUsecase(purchasesRepository)
const purchasesHandler = new PurchasesHandler(purchasesUsecase)


router.get("/purchase/detail/:id", (req,res) => {purchasesHandler.getDetailPurchaseByPurchaseId(req,res)})
router.get("/purchase", (req,res) => {purchasesHandler.getAllPurchases(req,res)})
router.post("/purchase", (req,res) => {purchasesHandler.createPurchase(req,res)})

export default router