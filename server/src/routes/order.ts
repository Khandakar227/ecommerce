import express from "express";
import { body } from "express-validator";
import { csrfProtect } from "../libs";
import { checkUser } from "../middlewares/verifyUser";
import { deleteOrder, getOrder, placeOrder, updateOrder } from "../controllers/order";
import { checkAdmin } from "../middlewares/checkAdmin";

const orderRoutes = express.Router();

const placeOrderValidations = [
    body('address').exists().withMessage('No address found'),
    body('address').custom(value => {
        if (!value.city || !value.area || !value.apartment) throw new Error("Address must have city, area, apartment name.");
        return true;
    })
];

// const deleteOrderValidations = [];
orderRoutes.get("/", checkUser, getOrder);
orderRoutes.post("/", csrfProtect, ...placeOrderValidations, checkUser, placeOrder);
orderRoutes.put("/:orderId", csrfProtect, checkAdmin, updateOrder);
orderRoutes.delete("/:orderId", csrfProtect, checkUser, deleteOrder);


export default orderRoutes;
