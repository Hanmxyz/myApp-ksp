import express from "express"
import productsRouter from "./src/router/productsRouter.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export { prisma }

const app = express()

app.use(express.json())

app.use("/api", productsRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000/")
})