import express from "express"
import barangRouter from "./src/router/barangRouter.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export { prisma }

const app = express()

app.use(express.json())

app.use("/api", barangRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000/")
})