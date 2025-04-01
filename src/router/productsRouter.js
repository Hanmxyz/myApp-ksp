import express from "express";
import ProductsRepository from "../repositories/productsRepository.js";
import ProductsUsecase from "../domain/products/productsUsecase.js";
import ProductsHandler from "../presentasion/api/productsHandler.js"


const router = express.Router();
const productsRepository = new ProductsRepository();
const productsUsecase = new ProductsUsecase(productsRepository);
const productsHandler = new ProductsHandler(productsUsecase);

router.get('/product', (req,res) => {productsHandler.getAllProducts(req,res)})
router.get('/product/:id', (req,res) => {productsHandler.getProductById(req,res)})
router.post('/product', (req,res) => {productsHandler.createProduct(req,res)})
router.put('/product/:id', (req,res) => {productsHandler.updateProduct(req,res)})
router.delete('/product/:id', (req,res) => {productsHandler.deleteProduct(req,res)})

export default router