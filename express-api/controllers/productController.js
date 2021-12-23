import Product from "../models/Product.js"
import fs from "fs";

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
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        // pict: 'http://localhost:5000/'+req.file.path
        pict: req.file.path
    });
    // console.log(product.pict)

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
export const updateProduct = async (req, res, file) => {
    const cekId = await Product.findById(req.params.id);
    let cekImg = req.file;
    let img = cekId.pict;
    try {
        if(cekImg == null) {
            const updatedProduct = await Product.updateOne(cekId, {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    pict: cekId.pict
                }
            });
            res.status(200).json({
                msg: "Product Updated",
                data: updatedProduct
            });
        } else {
            removeImage(img);
            const updatedProduct = await Product.updateOne(cekId, {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    pict: req.file.path
                }
            });
            res.status(200).json({
                msg: "Product Updated",
                data: updatedProduct
            });
        }
        
        // console.log(req.file.path)
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

//untuk hapus product
export const deleteProduct = async (req, res) => {
    const cekId = await Product.findById(req.params.id);
    try {
        if (!cekId) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        }
        removeImage(cekId.pict);
        const deletedProduct = await Product.findByIdAndRemove(cekId);
        res.status(200).json({
            msg: "Product Deleted",
            data: deletedProduct
        })
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            message: error.message
        });
    }

    // try {
    //     const deletedProduct = await Product.deleteOne({
    //         _id: req.params.id
    //     });
    //     res.status(200).json({
    //         msg: "Product Deleted",
    //         data: deletedProduct
    //     });
    // } catch (error) {
    //     res.status(400).json({
    //         message: error.message
    //     });
    // }
}

const removeImage = (filePath) => {
    // console.log('filePath', filePath)
    // console.log(filePath);
    filePath = (filePath)
    fs.unlink(filePath, err => console.log(err))
}