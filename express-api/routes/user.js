import express from "express";
import userController from "../controllers/userController.js";
import auth from "../config/auth.js";
import {validator, validatorRegister, validatorLogin} from "../validation/user.js";
const router = express.Router();

router.post("/register", validatorRegister, validator, userController.registerNewUser);
router.post("/login", validatorLogin, validator, userController.loginUser);
router.get("/me", auth,userController.getUserDetails);

export default router;