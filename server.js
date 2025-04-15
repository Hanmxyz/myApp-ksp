import express from "express"
import productsRouter from "./src/router/productsRouter.js"
import categoriesRouter from "./src/router/categoriesRouter.js"
import productUnitsRouter from "./src/router/productUnitsRouter.js"
import membersRouter from "./src/router/membersRouter.js"
import managementsRouter from "./src/router/managementsRouter.js"
import managementDetailsRuoter from "./src/router/managementDetailsRouter.js"
import supplierRouter from "./src/router/suppliersRouter.js"
import staffsRouter from "./src/router/staffsRouter.js"
import vendorsRouter from "./src/router/vendorsRouter.js"
import vendorProductsRouter from "./src/router/vendorProductsRouter.js"
import purchasesRouter from "./src/router/purchasesRouter.js"
import salesRouter from "./src/router/salesRouter.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
export { prisma }

const app = express()

app.use(express.json())

app.use("/api", productsRouter)
app.use("/api", categoriesRouter)
app.use("/api", productUnitsRouter)
app.use("/api", membersRouter)
app.use("/api", managementsRouter)
app.use("/api", managementDetailsRuoter)
app.use("/api", supplierRouter)
app.use("/api", staffsRouter)
app.use("/api", vendorsRouter)
app.use("/api", vendorProductsRouter)

app.use("/api", purchasesRouter)
app.use("/api", salesRouter)
app.listen(3000, () => {
    console.log("http://localhost:3000/")
})

