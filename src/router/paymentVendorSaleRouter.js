import express from "express";

import PaymentVendorSaleRepository from "../repositories/paymentVendorSaleRepository.js"
import PaymentVendorSaleUsecase from "../domain/paymentVendorSaleUsecase/paymentVendorSaleUsecase.js";
import PaymentVendorSaleHandler from "../presentasion/api/paymentVendorSaleHandler.js";

const router = express.Router()

const paymentVendorSaleRepository = new PaymentVendorSaleRepository()
const paymentVendorSaleUsecase = new PaymentVendorSaleUsecase(paymentVendorSaleRepository)
const paymentVendorSaleHandler = new PaymentVendorSaleHandler(paymentVendorSaleUsecase)


router.get("/payment_vendor/:id", (req,res) => {paymentVendorSaleHandler.getPaymentVendorSaleWithDetail(req,res)})
router.put("/payment_vendor/:id", (req,res) => {paymentVendorSaleHandler.updatePaymentVendorSale(req,res)})



export default router