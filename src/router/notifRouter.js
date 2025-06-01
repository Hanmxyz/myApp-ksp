import express from "express";
import NotifRepository from "../repositories/notifRepository.js";
import NotifUsecase from "../domain/notif/notifUsecase.js";
import NotifHandler from "../presentasion/api/notifHandler.js";

const router = express.Router()

const notifRepository = new NotifRepository()
const notifUsecase = new NotifUsecase(notifRepository)
const notifHandler = new NotifHandler(notifUsecase)

router.get("/notif/Modal", (req,res) => notifHandler.getTotalModal(req,res))

export default router