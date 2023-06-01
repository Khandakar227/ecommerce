import express from "express";
import { body } from "express-validator";
import { login, signUp, updateUser } from "../controllers/user";
import { verifyUserCookie } from "../middlewares/verifyUser";
import { csrfProtect } from "../libs";

const userRoutes = express.Router();


userRoutes.post(
    '/signup',
    body("name").exists().withMessage("name is required"), body("email").exists().withMessage("email is required"), body("password").exists().withMessage("password is required"),
    signUp
);

userRoutes.post(
    '/login',
    body("email").exists().withMessage("email is required"), body("password").exists().withMessage("password is required"),
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