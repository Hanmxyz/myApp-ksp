import { prisma } from "../../server.js"

    export default class BarangRepository {
        async getAllBarang() {
            return await prisma.tbBarang.findMany();
        };
        async getBarangById(id) {
            return await prisma.tbBarang.findUnique({
                where: { kode_barang: String(id) }
            })
        }
        async createBarang(barangData) {
            return await prisma.tbBarang.create({
                data: barangData,
            });
        };
        async updateBarang(barangData,id) {
            return await prisma.tbBarang.update({
                where: { id: Number(id)},
                data : barangData,
            });
        }
        async deleteBarang(id) {
            return await prisma.tbBarang.delete({
                where: { kode_barang: String(id)},
            });
        }
    }

