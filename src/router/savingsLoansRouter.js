import express from "express";

import SavingsLoansRepository from "../repositories/savingsLoansRepository.js";
import SavingsLoansUsecase from "../domain/savingsLoans/savingsLoansUsecase.js";
import SavingsLoansHandler from "../presentasion/api/savingsLoansHandler.js";

const router = express.Router()

const savingsLoansRepository = new SavingsLoansRepository()
const savingsLoansUsecase = new SavingsLoansUsecase(savingsLoansRepository)
const savingsLoansHandler = new SavingsLoansHandler(savingsLoansUsecase)

router.get("/savingsloans", (req,res) => savingsLoansHandler.getAllSavingsLoans(req,res))
router.get("/savingsloans/:id", (req,res) => savingsLoansHandler.getSavingsLoansById(req,res))
router.post("/savingsloans", (req,res) => savingsLoansHandler.createSavingsLoans(req,res))
router.put("/savingsloans/:id", (req,res) => savingsLoansHandler.updateSavingsLoans(req,res))
router.delete("/savingsloans/:id", (req,res) => savingsLoansHandler.deleteSavingsLoans(req,res))

export default router