import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CartItem from "../models/cartItem";
import Product from "../models/product";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });
    // Get the product information from the given product Id
    const { quantity, productId, size, color } = req.body;
    // Check if product with the id, size, color value and quantity less than available matches or not
    const product = await Product.findOne({
      _id: productId,
      sizes: {
        $elemMatch: {
          name: size.name,
          priceDiff: size.priceDiff,
          quantity: { $gt: quantity },
        },
      },
      colors: {
        $elemMatch: {
          name: color?.name,
          priceDiff: color?.priceDiff,
          quantity: { $gt: quantity },
        },
      },
    });
    // Send 404 if the product id is invalid or not found
    if (!product) {
      res.status(404).json({
        message: "The product not found or out of stock",
      });
      return;
    }

    // Calculate the selected price for the chosen options
    let selectedPrice = product.price + size.priceDiff + color.priceDiff;

    //If the product exists make sure if the product was previously added to the cart or not
    //if added than we only need to update the cartItem
    let cartItem = await CartItem.findOne({ productId, "size.name": size.name, "color.name": color.name, userId: res.locals.user._id });

    if (!cartItem) {
      //Add in the info
      cartItem = await CartItem.create({
        userId: res.locals.user?._id,
        email: res.locals.user?.email,
        username: res.locals.user?.name,
        quantity,
        productId,
        productName: product.title,
        productImage: product.imageSrc[0],
        productPrice: product.price,
        totalPrice: selectedPrice * quantity,
        size,
        color,
      });
      await cartItem.save();
    } else {
      cartItem.quantity += quantity;
      cartItem.totalPrice += selectedPrice * quantity;
      await cartItem.save();
    }

    res.status(200).json({ message: "Added to cart", cartItem });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
