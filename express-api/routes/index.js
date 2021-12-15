import express from "express";
import {
    getProducts,
    saveProduct,
    updateProduct,
    getProductById,
    deleteProduct
} from "../controllers/productController.js";
import upload from "../config/multer.js"; 

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload, saveProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
