import Product from "../models/Product.js"

//untuk menampilkan product
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//untuk menampilkan product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json({
            data: product
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

//untuk menyimpan product
export const saveProduct = async (req, res, file) => {
    console.log(req.file)
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        pict: req.file.path
    });
    
    try {
        const savedProduct = await product.save();
        res.status(201).json({
            msg: "Product Created",
            data: savedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

//untuk mengupdate product
export const updateProduct = async (req, res) => {
    const cekId = await Product.findById(req.params.id);
    if (!cekId) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        });
    }
    try {
        const updatedProduct = await Product.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        });
        res.status(200).json({
            msg: "Product Updated",
            data: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

//untuk hapus product
export const deleteProduct = async (req, res) => {
    const cekId = await Product.findById(req.params.id);
    if (!cekId) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        });
    }
    try {
        const deletedProduct = await Product.deleteOne({
            _id: req.params.id
        });
        res.status(200).json({
            msg: "Product Deleted",
            data: deletedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}