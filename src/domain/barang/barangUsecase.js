class BarangUsecase {
    constructor(barangRepository) {
        this.barangRepository = barangRepository;
    }

    async getAllBarang() {
        return await this.barangRepository.getAllBarang();
    }

    async getBarangById(id) {
        return await this.barangRepository.getBarangById(id);
    }

    async createBarang(barang) {
        return await this.barangRepository.createBarang(barang);
    }

    async updateBarang(barang, id) {
        return await this.barangRepository.updateBarang(barang, id);
    }

    async deleteBarang(id) {
        return await this.barangRepository.deleteBarang(id);
    }
}


export default BarangUsecase;
