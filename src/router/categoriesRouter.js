import express from "express";
import CategoriesRepository from "../repositories/categoriesRepository.js";
import CategoriesUsecase from "../domain/categories/categoriesUsecase.js";
import CategoriesHandler from "../presentasion/api/categoriesHandler.js";

const router = express.Router()
const categoriesRepository = new CategoriesRepository();
const categoriesUsecase = new CategoriesUsecase(categoriesRepository);
const categoriesHandler = new CategoriesHandler(categoriesUsecase);

router.get('/category', (req,res) => {categoriesHandler.getAllCategories(req,res)})
router.post('/category', (req,res) => {categoriesHandler.createCategory(req,res)})
router.put('/category/:id', (req,res) => {categoriesHandler.updateCategory(req,res)})
router.delete('/category/:id', (req,res) => {categoriesHandler.deleteCategory(req,res)})

export default router