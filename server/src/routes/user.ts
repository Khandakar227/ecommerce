import express from "express";
import { body, check } from "express-validator";
import { login, logout, signUp, updateUser } from "../controllers/user";
import { checkUser, verifyUserCookie } from "../middlewares/verifyUser";
import { csrfProtect } from "../libs";

const userRoutes = express.Router();

const signUpValidations = [
    body("name").exists().withMessage("name is required"), body("email").exists().withMessage("email is required"), check('email').isEmail().withMessage("Invalid email"), body("password").exists().withMessage("password is required"),
    body('password').isLength({ min: 8 }).withMessage("Password should have atleast 8 characters"),
];
const loginValidations = [
    body("email").exists().withMessage("email is required"), body("password").exists().withMessage("password is required"),
]
const updateUserValidations = [
    body("name").exists().withMessage("Name is required"), body("name").notEmpty().withMessage("Name is required"),
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
    csrfProtect,
    ...updateUserValidations,
    checkUser,
    updateUser
);

userRoutes.post("/logout", csrfProtect, logout);
export default userRoutes;