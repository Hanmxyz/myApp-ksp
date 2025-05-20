import ProductsUsecase from "../products/productsUsecase.js"
import ProductsRepository from "../../repositories/productsRepository.js"

export default class DashboardUsecase {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository
        this.ProductsUsecase = new ProductsUsecase(new ProductsRepository)
    }

    async getDashboards() {
        const { allSale, allSaleDay } = await this.dashboardRepository.getSaleDashboard()
        const { allPurchase, allPurchaseDay } = await this.dashboardRepository.getPurchaseDashboard()
        const { allProfitSales, todayProfitSales } = await this.dashboardRepository.getProfitSaleDashboard()
        const { allProfitVS, todayProfitVS } = await this.dashboardRepository.getProfitVendorSaleDashboard()
        const { allOpcost, todayOpcost } = await this.dashboardRepository.getOpcostDashboard()
        const allProducts = await this.ProductsUsecase.getAllProducts()

        let allPs = 0
        let todayPs = 0
        for (const item of allProfitSales) {
            allPs += ((item.salePrice * item.quantity) - (item.purchasePrice * item.quantity))
        }
        for (const item of todayProfitSales) {
            todayPs += ((item.salePrice * item.quantity) - (item.purchasePrice * item.quantity))
        }

        const notifMinSock = allProducts.data.map(item => {
            if (item.stock <= item.minStock) {
                return { name: item.name, message: "stock dibawah minimal", stock: `${item.stock} < ${item.minStock}` }
            }
        }).filter(Boolean)

        const data = {
            sale: {
                overallTotal: allSale._sum.totalAmount || 0,
                dailyTotal: allSaleDay._sum.totalAmount || 0
            },
            purchase: {
                overallTotal: allPurchase._sum.totalAmount || 0,
                dailyTotal: allPurchaseDay._sum.totalAmount || 0
            },
            profitSale: {
                overallTotal: allPs || 0,
                dailyTotal: todayPs || 0
            },
            profitVendorSale: {
                overallTotal: allProfitVS._sum.profitKsp || 0,
                dailyTotal: todayProfitVS._sum.profitKsp || 0
            },
            opcost: {
                overallTotal: allOpcost._sum.cost || 0,
                dailyTotal: todayOpcost._sum.cost || 0
            },
            minStock: notifMinSock
        }

        return data
    }

    async getChartDashboard(queryString) {
        const data = await this.dashboardRepository.getChart(queryString)
        function transformData(inputArray) {
            const monthlyTotals = {};
            const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
            ];

            inputArray.forEach(item => {
                const date = new Date(item.date);
                const monthIndex = date.getMonth(); // 0-indexed
                const year = date.getFullYear();
                const monthYearKey = `${year}-${monthIndex}`;

                if (!monthlyTotals[monthYearKey]) {
                    monthlyTotals[monthYearKey] = 0;
                }
                monthlyTotals[monthYearKey] += item.totalAmount;
            });

            const data = monthNames.map((name, index) => {
                const currentYear = new Date().getFullYear(); // Assuming the data is for the current year
                const monthYearKey = `${currentYear}-${index}`;
                return { name, total: monthlyTotals[monthYearKey] || 0 };
            });

            return data;
        }
        function getLast7DaysSummary(transactions, currentDateStr = new Date().toISOString().split("T")[0]) {
            const dayNames = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
            const result = [];

            const currentDate = new Date(currentDateStr);

            for (let i = 6; i >= 0; i--) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);

                const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
                const dayName = dayNames[date.getDay()];

                const total = transactions
                    .filter(t => {
                        const tDateStr = new Date(t.date).toISOString().split("T")[0];
                        return tDateStr === formattedDate;
                    })
                    .reduce((sum, t) => sum + t.totalAmount, 0);

                result.push({
                    name: dayName,
                    total: total
                });
            }

            return result;
        }

        if (queryString.periode === "yearly") {
            return transformData(data)
        } else if (queryString.periode === "weekly") {
            return getLast7DaysSummary(data)
        } else {
            return { message: "data tidak ditemukan" }
        }
    }

    async getTopLoyalMemberLeader() {
        const { sale, vendorSale, member } = await this.dashboardRepository.getTopLoyalMemberLeader()
        const data = member.map(item => {
            const pSale = sale.find(index => index.nip === item.nip)
            const vSale = vendorSale.find(i => i.nip === item.nip)
            const totalTx = (pSale?._count?.id || 0) + (vSale?._count?.id || 0)
            const totalAmount = (pSale?._sum?.totalAmount || 0) + (vSale?._sum?.totalAmount || 0)

            if (pSale || vSale ) {
                return {
                    nip: item.nip,
                    name: item.name,
                    allTx: totalTx,
                    allAmount: totalAmount
                }
            } else {
                return {
                    nip: item.nip,
                    name: item.name,
                    allTx: 0,
                    allAmount: 0
                }
            }
        }).filter( item => item.nip !== "0000000000" ).sort((a,b) => b.allTx - a.allTx)

        return data
    }
}