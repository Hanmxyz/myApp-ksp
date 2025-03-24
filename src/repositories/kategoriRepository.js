import { prisma } from "../../server.js";

class KategoriRepository {
    async getAllKategori() {
        return await prisma.tbKategori.findMany()
    }

    async getKategoryById(id) {
        return 
    }
}
