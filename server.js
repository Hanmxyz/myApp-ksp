import express from "express"
import dashboardRouter from "./src/router/dashboardRouter.js"
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
import vendorSaleRouter from "./src/router/vendorSalesRouter.js"
import paymentCreditVendorSaleRouter from "./src/router/paymentCreditVendorSaleRouter.js"
import paymentCreditSaleRouter from "./src/router/paymentCreditSaleRouter.js"
import paymentVendorSaleRouter from "./src/router/paymentVendorSaleRouter.js"
import operationalCostRouter from "./src/router/operationalCostsRouter.js"
import reportRouter from "./src/router/reportRouter.js"
import authRouter from "./src/router/authRouter.js"
import { PrismaClient } from "@prisma/client"
import cookieParser from 'cookie-parser';
import * as env from "dotenv"
import cors from "cors"
import AuthMiddleware from "./src/presentasion/api/authMiddleware.js"

env.config()
const allowedOrigins = process.env.FE_SITE.split(",").map(origin =>
    origin.trim().replace(/\/$/, "") // hapus trailing slash
);

const prisma = new PrismaClient();
export { prisma }


const app = express()


app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS: " + origin));
            }
        },
        credentials: true,
    })
);
app.use("/auth", authRouter)

app.use(AuthMiddleware)

app.use("/api", dashboardRouter)

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
app.use("/api", vendorSaleRouter)
app.use("/api", paymentCreditVendorSaleRouter)
app.use("/api", paymentCreditSaleRouter)
app.use("/api", paymentVendorSaleRouter)
app.use("/api", operationalCostRouter)

app.use("/api", reportRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000/")
})

