import e from "express"
import express from "express"

export default class ManagementsHandler{
    constructor(managementsUsecase){
        this.managementsUsecase = managementsUsecase
    }

    async getAllManagemets(req,res) {
        try {
            const data = await this.managementsUsecase.getAllManagemets()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async getManagementById(req,res) {
        try {
            const id = req.params.id
            const data = await this.managementsUsecase.getManagementById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message })
        }
    }

    async createManagement(req,res) {
        try {
            const data = req.body
            await this.managementsUsecase.createManagement(data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async updateManagement(req,res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.managementsUsecase.updateManagement(id, data)
            res.json({message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async deleteManagement(req,res) {
        try {
            const id = req.params.id
            await this.managementsUsecase.deleteManagement(id)
            res.json({ message : true })
        } catch (error) {
            res.status(500).json({ message : true })
        }
    }
}

