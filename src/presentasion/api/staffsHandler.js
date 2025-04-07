import express from "express"

export default class StaffsHandler {
    constructor(staffsUsecase) {
        this.staffsUsecase = staffsUsecase
    }
    async getAllstaffs(req, res) {
        try {
            const data  = await this.staffsUsecase.getAllstaffs()
            res.json(data)
        } catch (error) {
            res.status(500).json({message : error.message})
        }

    }

    async getStaffById(req, res) {
        try {
            const id = req.params.id
            const data = await this.staffsUsecase.getStaffById(id)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async createStaff(req, res) {
        try {
            const data = req.body
            await this.staffsUsecase.createStaff(data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }

    async updateStaff(req, res) {
        try {
            const id = req.params.id
            const data = req.body
            await this.staffsUsecase.updateStaff(id,data)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message })
        }

    }

    async deleteStaff(req, res) {
        try {
            const id = req.params.id
            await  this.staffsUsecase.deleteStaff(id)
            res.json({ message : true})
        } catch (error) {
            res.status(500).json({ message : error.message})
        }
    }
}