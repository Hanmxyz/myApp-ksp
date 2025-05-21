import { prisma } from "../../server.js"

export default class SalesRepository {

    async getAllSales() {
        return await prisma.sale.findMany()
    }

    async getDetailSaleBySaleId(id) {
        return await prisma.saleDetail.findMany({
            where: { saleId: Number(id) },
            include: {
                product: true
            }
        })
    }

    async createSale(data, details, userId) {

        try {
            const isCredit = data.paymentMetode === "bon";

            const result = await prisma.sale.create({
                data: {
                    saleDate: new Date(),
                    nip: data.nip,
                    totalAmount: parseFloat(data.totalAmount),
                    paymentType: data.paymentType,
                    paymentStatus: data.paymentStatus,
                    paymentMetode: data.paymentMetode,
                    totalPayment: parseFloat(data.totalPayment),
                    change: parseFloat(data.change),
                    userId: userId,
                    details: {
                        create: details.map(p => ({
                            productId: p.productId,
                            stockId: p.stockId,
                            purchasePrice: parseFloat(p.purchasePrice),
                            salePrice: parseFloat(p.salePrice),
                            quantity: p.quantity,
                            subtotal: parseFloat(p.quantity * p.salePrice)
                        }))
                    },
                    ...(isCredit && {
                        credit: {
                            create: [
                                {
                                    nip: data.nip,
                                    paymentTotal: parseFloat(data.totalAmount),
                                    paymentDate: new Date(),
                                    status: "cicilan"
                                }
                            ]
                        }
                    })
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

    async createSaleWithTransaction(data, details, updateProducts, updateStocks, userId) {
        const isCredit = data.paymentMetode === "bon";

        return await prisma.$transaction(async (tx) => {
            // 1. Update stock individual jika ada
            if (updateStocks && updateStocks.length > 0) {
                for (const s of updateStocks) {
                    await tx.stock.update({
                        where: { id: Number(s.id) },
                        data: { stock: s.stock }
                    });
                }
            }

            // 2. Update total stock produk jika ada
            if (updateProducts && updateProducts.length > 0) {
                for (const p of updateProducts) {
                    await tx.product.update({
                        where: { id: Number(p.id) },
                        data: { stock: p.stock }
                    });
                }
            }

            // 3. Buat data penjualan (wajib)
            const result = await tx.sale.create({
                data: {
                    saleDate: new Date(),
                    nip: data.nip,
                    totalAmount: parseFloat(data.totalAmount),
                    paymentType: data.paymentType,
                    paymentStatus: data.paymentStatus,
                    paymentMetode: data.paymentMetode,
                    totalPayment: parseFloat(data.totalPayment),
                    change: parseFloat(data.change),
                    userId: userId,
                    details: {
                        create: details.map(p => ({
                            productId: p.productId,
                            stockId: p.stockId,
                            purchasePrice: parseFloat(p.purchasePrice),
                            salePrice: parseFloat(p.salePrice),
                            quantity: p.quantity,
                            subtotal: parseFloat(p.quantity * p.salePrice)
                        }))
                    },
                    ...(isCredit && {
                        credit: {
                            create: [{
                                nip: data.nip,
                                paymentTotal: parseFloat(data.totalAmount),
                                paymentDate: new Date(),
                                status: "cicilan"
                            }]
                        }
                    })
                }
            });

            return result;
        });
    }
}