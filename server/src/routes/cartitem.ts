import express from "express";
import { body } from "express-validator";
import { csrfProtect } from "../libs";
import { checkUser } from "../middlewares/verifyUser";
import { addToCart } from "../controllers/cartitem";

const cartRoutes = express.Router();

const addToCartValidation = [
    body("quantity").isInt({gt: 0}).withMessage("Quantity should be greater than 0"),
    body("productId").exists().withMessage("No product id was provided"),
]

cartRoutes.post("/", csrfProtect, checkUser, ...addToCartValidation, addToCart);

export default cartRoutes;