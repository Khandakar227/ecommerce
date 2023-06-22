import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CartItem from "../models/cartItem";
import Order from "../models/order";
import Product from "../models/product";
import { getOrderedItemsAndTotalPrice } from "../libs";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });

    if (!res.locals.user)
      return res.status(401).json({ message: "User not verified" });

    const cartItems = await CartItem.find({ userId: res.locals.user._id });
    
    if (!cartItems.length)
      return res.status(404).json({ message: "No cart items found" });
    
    const orderDetails = await getOrderedItemsAndTotalPrice(cartItems);
    
    const order = await Order.create({
      userId: res.locals.user._id,
      username: res.locals.user.name,
      email: res.locals.user.email,
      status: "not-confirmed",
      items: orderDetails.items,
      totalPrice: Math.round(orderDetails.totalPrice),
    });
    await order.save();
    
    // Delete all items from users cart
    await CartItem.deleteMany({ userId: res.locals.user._id });

    res.status(200).json({ message: "Your order has been placed", order });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });

    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Your order has been deleted" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
