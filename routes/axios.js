import express from "express";
import {
    getAll,
    postAll
} from "../controllers/axios.js";
const router = express.Router();

router.get('/', getAll);
router.post('/', postAll);

export default router;
