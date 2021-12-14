import express from "express";
import userController from "../controllers/userController.js";
import auth from "../config/auth.js";
import {validator, validatorRegister} from "../validation/user.js";
const router = express.Router();

router.post("/register", validatorRegister, validator, userController.registerNewUser);
router.post("/login", userController.loginUser);

export default router;