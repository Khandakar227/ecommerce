import express from "express";
import { body, check } from "express-validator";
import { login, signUp, updateUser } from "../controllers/user";
import { verifyUserCookie } from "../middlewares/verifyUser";
import { csrfProtect } from "../libs";

const userRoutes = express.Router();

const signUpValidations = [
    body("name").exists().withMessage("name is required"), body("email").exists().withMessage("email is required"), check('email').isEmail().withMessage("Invalid email"), body("password").exists().withMessage("password is required"),
    body('password').isLength({ min: 8 }).withMessage("Password should have atleast 8 characters"),
];
const loginValidations = [
    body("email").exists().withMessage("email is required"), body("password").exists().withMessage("password is required"),
]

userRoutes.post(
    '/signup',
    ...signUpValidations,
    signUp
);

userRoutes.post(
    '/login',
    ...loginValidations,
    login
);

userRoutes.put(
    "/update",
    body("email").exists().withMessage("email is required"),
    csrfProtect,
    verifyUserCookie,
    updateUser
);

export default userRoutes;