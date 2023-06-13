import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CartItem from "../models/cartItem";
import Order from "../models/order";
import { getProductFromCart } from "../libs";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });
    let totalPrice = 0;
    const cartItems = await CartItem.find({ userId: res.locals.user._id });

    const order = await Order.create({
      userId: res.locals.user._id,
      username: res.locals.user.name,
      email: res.locals.user.email,
      status: "not-confirmed",
      items: [
        ...cartItems.map(async (cartItem) =>
        {
            const products = await getProductFromCart(cartItem);
            const individualPrice = products[0].price + (products[0].sizes[0].priceDiff || 0) + (products[0].colors.priceDiff || 0) - (products[0].discount * products[0].price / 100 || 0) * cartItem.quantity;
            totalPrice += individualPrice;
            return {
              productId: cartItem.productId,
              productName: cartItem.productName,
              productImage: cartItem.productImage,
              productPrice: cartItem.productPrice,
              totalPrice: individualPrice,
            }
        }
        ),
      ],
      totalPrice,
    });
    await order.save();
    res.status(200).json({ message: "Your order has been placed", order });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
