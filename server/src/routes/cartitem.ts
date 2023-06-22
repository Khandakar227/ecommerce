import express from "express";
import { body } from "express-validator";
import { csrfProtect } from "../libs";
import { checkUser } from "../middlewares/verifyUser";
import { addToCart, deleteCartItem, getCartItems, updateCartItem } from "../controllers/cartitem";

const cartRoutes = express.Router();

const addToCartValidation = [
    body("quantity").isInt({gt: 0}).withMessage("Quantity should be greater than 0"),
    body("productId").exists().withMessage("No product id was provided"),
]
const updateCartValidation = [
    body("quantity").isInt({gt: 0}).withMessage("Quantity should be greater than 0"),
];

cartRoutes.get("/", checkUser, getCartItems);
cartRoutes.post("/", csrfProtect, checkUser, ...addToCartValidation, addToCart);
cartRoutes.put("/:id", csrfProtect, checkUser, ...updateCartValidation, updateCartItem);
cartRoutes.delete("/:id", csrfProtect, checkUser, deleteCartItem);

export default cartRoutes;
