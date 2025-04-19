export default class VendorProductsUsecase{
    constructor(vendorProductsRepository) {
        this.vendorProductsRepository = vendorProductsRepository
    }

    async getAllVendorProducts() {
        const data =  await this.vendorProductsRepository.getAllVendorProducts()
        const vendorProduct = data.map( p => {
            return {
                id  : p.id,
                vendor : p.vendor.name,
                name : p.name,
                category : p.category.name,
                sellPrice : p.sellPrice,
                profitPercent : p.profitPercent,
                entryDate : p.entryDate
            }
        })

        return {
            title : "vendorProduct",
            header : ["id", "vendor", "name", "category", "sellPrice", "profitPercent", "entryDate"],
            data : vendorProduct
        }
    }

    async getVendorProductById(id) {
        return await this.vendorProductsRepository.getVendorProductById(id)
    }

    async getVendorProductByVendorId(id) {
        const data = await this.vendorProductsRepository.getVendorProductByVendorId(id)
        const product = data.map( p => {
            return {
                id : p.id,
                name : p.name,
                category : p.category.name,
                sellPrice : p.sellPrice,
                profitPercent : p.profitPercent
            }
        })

        const newData = {
            title : "daftar barang",
            header : ["id","Nama barang", "kategori", "harga jual", "persen untung"],
            data : product
        }

        return newData
    }

    async createVendorProduct(data) {
        return await this.vendorProductsRepository.createVendorProduct(data)
    }

    async updateVendorProduct(id, data) {
        return await this.vendorProductsRepository.updateVendorProduct(id, data)
    }

    async deleteVendorProduct(id) {
        return await this.vendorProductsRepository.deleteVendorProduct(id)
    }
}