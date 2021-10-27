import express from "express";
import {
    getAll
} from "../controllers/axios.js";
const router = express.Router();

router.get('/', getAll);

export default router;
