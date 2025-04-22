import express from "express";

import PaymentCreditVendorSaleRepository from "../repositories/paymentCreditVendorSaleRepository.js";
import PaymentCreditVendorSalesUsecase from "../domain/paymentCreditVendorSales/paymentCreditVendorSalesUsecase.js";
import PaymentCreditVendorSalesHandler from "../presentasion/api/paymentCreditVendorSalesHandler.js";


const router = express.Router()

const paymentCreditVendorSaleRepository = new PaymentCreditVendorSaleRepository()
const paymentCreditVendorSalesUsecase = new PaymentCreditVendorSalesUsecase(paymentCreditVendorSaleRepository)
const paymentCreditVendorSalesHandler = new PaymentCreditVendorSalesHandler(paymentCreditVendorSalesUsecase)

router.get("/creditvendorsale", (req,res) => { paymentCreditVendorSalesHandler.getAllCreditMember(req,res)})
router.get("/creditvendorsale/:nip", (req,res) => { paymentCreditVendorSalesHandler.getCreditMemberByNip(req,res)})
router.put("/creditvendorsale/:nip", (req,res) => { paymentCreditVendorSalesHandler.updateCreditMember(req,res)})



export default router