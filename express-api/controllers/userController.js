import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerNewUser = async (req, res) => {
    try {
        let checkUser = await User.findOne({
            email: req.body.email
        })

        if (checkUser) {
            return res.status(409).json({
                message: "email already in use"
            })
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
        res.status(201).json({
            data,
            token
        });
    } catch (err) {
        res.status(400).json({
            err: err
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.status(201).json({
            user,
            token
        });
        
    } catch (err) {
        res.status(400).json({
            err: "Email yang anda masukkan tidak terdaftar"
        });
    }
};

export default {
    registerNewUser,
    loginUser
};