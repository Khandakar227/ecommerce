import express from "express";
import { body } from "express-validator";
import { csrfProtect } from "../libs";
import { checkUser } from "../middlewares/verifyUser";
import { deleteOrder, placeOrder, updateOrder } from "../controllers/order";
import { checkAdmin } from "../middlewares/checkAdmin";

const orderRoutes = express.Router();

const placeOrderValidations = [
    
];
// const deleteOrderValidations = [];

orderRoutes.post("/", csrfProtect, checkUser, placeOrder);
orderRoutes.put("/:orderId", csrfProtect, checkAdmin, updateOrder);
orderRoutes.delete("/:orderId", csrfProtect, checkUser, deleteOrder);


export default orderRoutes;
