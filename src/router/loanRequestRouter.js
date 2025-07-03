import express from "express";

import LoanRequestRepository from "../repositories/loanRequestRepository.js";
import LoanRequestUsecase from "../domain/loanRequests/loanRequestUsecase.js";
import LoanRequestHandler from "../presentasion/api/loanRequestHandler.js";


const router = express.Router()

const loanRequestRepository = new LoanRequestRepository
const loanRequestUsecase = new LoanRequestUsecase(loanRequestRepository)
const loanRequestHandler = new LoanRequestHandler(loanRequestUsecase)


router.get("/loan_request", (req,res) => { loanRequestHandler.getAllLoanRequests(req,res)})
router.get("/loan_request/:id", (req,res) => { loanRequestHandler.getLoanRequestById(req,res)})
router.post("/loan_request", (req,res) => { loanRequestHandler.createLoanRequest(req,res)})
router.put("/loan_request/:id", (req,res) => { loanRequestHandler.updateLoanRequestStatus(req,res)})
router.delete("/loan_request/:id", (req,res) => { loanRequestHandler.deleteLoanRequest(req,res)})

export default router