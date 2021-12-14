import { check, validationResult } from "express-validator";

export const validator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

export const validatorRegister = [
    check('name', 'nama tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('masukkan email yang valid'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('password minimal 6 karakter')
]

export const validatorLogin = [
    check('email', 'email tidak boleh kosong').notEmpty().matches(/.+\@.+\..+/).withMessage('masukkan email yang valid'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('password minimal 6 karakter')
]