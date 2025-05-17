import express from "express";

import AuthRepository from "../repositories/authRepository.js";
import AuthUsecase from "../domain/auth/authUsecase.js";
import AuthHandler from "../presentasion/api/authHandler.js";

const router = express.Router()

const authRepository = new AuthRepository()
const authUsecase = new AuthUsecase(authRepository)
const authHandler = new AuthHandler(authUsecase)

router.post( "/login", (req,res) => authHandler.login(req,res))
router.post( "/logout", (req,res) => authHandler.logout(req,res))
router.post( "/signup", (req,res) => authHandler.signup(req,res))

export default router