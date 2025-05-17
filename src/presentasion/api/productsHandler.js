class ProductsHandler {
    constructor(ProductsUsecase) {
        this.ProductsUsecase = ProductsUsecase;
    }

    async getAllProducts(req,res) {
        try {
            const data = await this.ProductsUsecase.getAllProducts();
            // console.log(data)
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: err.message });
        };
    }

    async getAllProductSearch(req,res) {
        try {
            const data = await this.ProductsUsecase.getAllProductSearch()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }

    async getProductById(req,res) {
        try {
            const id = req.params.id
            const data = await this.ProductsUsecase.getProductById(id);
            res.json(data);
        } catch(err) {
            res.status(500).json({ message :  err.message })
        }
    }

    async createProduct(req,res) {
        try {
            const product =  req.body;
            await this.ProductsUsecase.createProduct(product);
            res.json({message : true})
        } catch(err) {
            res.status(500).json({message :  err.message })
        }
    }

    async updateProduct(req, res) {
        try {
            const product = req.body;
            const id = req.params.id;
            await this.ProductsUsecase.updateProduct(id, product);
            res.json({message : true})
        } catch(err) {
            res.status(500).json({ message :  err.message })
        }
    }

    async deleteProduct(req,res) {
        try {
            const id = req.params.id;
            await this.ProductsUsecase.deleteProduct(id);
            res.json({ message : true })
        } catch(err) {
            res.status(500).json({message : err.message })
        }
    }
}

export default ProductsHandler;