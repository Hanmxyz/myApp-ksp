class BarangController {
    constructor(BarangUsecase) {
        this.BarangUsecase = BarangUsecase;
    }

    async getAllBarang(req,res) {
        try {
            const barang = await this.BarangUsecase.getAllBarang();
            res.json(barang);
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }

    async getBarangById(req,res) {
        try {
            const id = req.params.id
            const barang = await this.BarangUsecase.getBarangById(id);
            res.json(barang);
        } catch(err) {
            res.status(500).json({ message :  err.message })
        }
    }

    async createBarang(req,res) {
        try {
            const barang =  req.body;
            await this.BarangUsecase.createBarang(barang);
            res.json({message : true})
        } catch(err) {
            res.status(500).json({message :  err.message })
        }
    }

    async updateBarang(req, res) {
        try {
            const barang = req.body;
            const id = req.params.id;
            await this.BarangUsecase.updateBarang(id, barang);
            res.json({message : true})
        } catch(err) {
            res.status(500).json({ message :  err.message })
        }
    }

    async deleteBarang(req,res) {
        try {
            const id = req.params.id;
            await this.BarangUsecase.deleteBarang(id);
            res.json({ message : true })
        } catch(err) {
            res.status(500).json({message : err.message })
        }
    }
}

export default BarangController;