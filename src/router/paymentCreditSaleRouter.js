import express from "express";

import PaymentCreditSalesRepository from "../repositories/paymentCreditSalesRepository.js";
import PaymentCreditSalesUsecase from "../domain/paymentCreditSales/paymentCreditSalesUsecase.js";
import PaymentCreditSalesHandler from "../presentasion/api/paymentCreditSaleHandler.js";


const router = express.Router()

const paymentCreditSalesRepository = new PaymentCreditSalesRepository()
const paymentCreditSalesUsecase = new PaymentCreditSalesUsecase(paymentCreditSalesRepository)
const paymentCreditSalesHandler = new PaymentCreditSalesHandler(paymentCreditSalesUsecase)

router.get("/creditsale", (req,res) => { paymentCreditSalesHandler.getAllCreditMember(req,res)})
router.get("/creditsale/:nip", (req,res) => { paymentCreditSalesHandler.getCreditMemberByNip(req,res)})
router.put("/creditsale/:nip", (req,res) => { paymentCreditSalesHandler.updateCreditMember(req,res)})



export default router