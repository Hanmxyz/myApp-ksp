import express from "express"
import MembersRepository from "../repositories/membersRepository.js"
import MembersUsecase from "../domain/members/membersUsecase.js"
import MembersHandler from "../presentasion/api/membersHandler.js"

const router = express.Router()

const membersRepository = new MembersRepository()
const membersUsecase = new MembersUsecase(membersRepository)
const membersHandler = new MembersHandler(membersUsecase)

router.get("/member", (req,res) => {membersHandler.getAllMembers(req,res)})
router.get("/member/:id", (req,res) => {membersHandler.getMemberById(req,res)})
router.post("/member", (req,res) => {membersHandler.createMember(req,res)})
router.put("/member/:id", (req,res) => {membersHandler.updateMember(req,res)})
router.delete("/member/:id", (req,res) => {membersHandler.deleteMember(req,res)})

export default router