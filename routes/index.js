import express from "express";
import {
    getProducts,
    saveProduct,
    updateProduct,
    getProductById,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', saveProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
