import express from "express";
import BarangRepository from "../repositories/barangRepository.js";
import BarangUsecase from "../domain/barangs/barangUsecase.js"
import BarangController from "../presentasion/api/barangController.js";


const router = express.Router();
const barangRepository = new BarangRepository();
const barangUsecase = new BarangUsecase(barangRepository);
const barangController = new BarangController(barangUsecase);

router.get('/barang', (req,res) => {barangController.getAllBarang(req,res)})
router.get('/barang/:id', (req,res) => {barangController.getBarangById(req,res)})
router.post('/barang', (req,res) => {barangController.createBarang(req,res)})
router.put('/barang/:id', (req,res) => {barangController.updateBarang(req,res)})
router.delete('/barang/:id', (req,res) => {barangController.deleteBarang(req,res)})

export default router