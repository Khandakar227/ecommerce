import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CartItem from "../models/cartItem";
import Product from "../models/product";
import { ObjectId } from "mongodb";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });
    // Get the product information from the given product Id
    const { quantity, productId, sizeId, colorId } = req.body;
    // Check if product with the id, size, color value and quantity less than available matches or not
    const product = await Product.aggregate([
      {
        $match: {
          _id: new ObjectId(productId),
          sizes: {
            $elemMatch: { _id: new ObjectId(sizeId) },
          },
          colors: {
            $elemMatch: { _id: new ObjectId(colorId) },
          },
        },
      },
      {
        $project: {
          title: 1,
          available: 1,
          imageSrc: 1,
          price: 1,
          sizes: {
            $filter: {
              input: "$sizes",
              cond: { $eq: ["$$this._id", new ObjectId(sizeId)] },
            },
          },
          colors: {
            $filter: {
              input: "$colors",
              cond: { $eq: ["$$this._id", new ObjectId(colorId)] },
            },
          },
        },
      },
    ]);
    // Send 404 if the product id is invalid or not found
    if (!product.length) {
      res.status(404).json({
        message: "The product not found",
      });
      return;
    }

    const qtyForSize = product[0].sizes[0].quantity;
    const qtyForColor = product[0].colors[0].quantity;
    if (qtyForSize < quantity || qtyForColor < quantity) {
      res.status(404).json({ message: "Not enough quantity to buy" });
      return;
    }
    // Calculate the selected price for the chosen options
    let selectedPrice = product[0].price + (product[0].sizes[0].priceDiff || 0) + (product[0].colors.priceDiff || 0) - (product[0].discount * product[0].price / 100 || 0);

    //If the product exists make sure if the product was previously added to the cart or not
    let cartItem = await CartItem.findOne({
      productId,
      sizeId,
      colorId,
      userId: res.locals.user._id,
    });

    //if added than we only need to update the cartItem
    if (!cartItem) {
      //Add in the info
      cartItem = await CartItem.create({
        userId: res.locals.user?._id,
        email: res.locals.user?.email,
        username: res.locals.user?.name,
        quantity,
        productId,
        productName: product[0].title,
        productImage: product[0].imageSrc[0],
        productPrice: product[0].price,
        totalPrice: selectedPrice * quantity,
        sizeId,
        colorId,
      });
      await cartItem.save();
    } else {
      // check if cartitem quantity and requested quantity exceeds product available
      if (
        cartItem?.quantity + quantity > qtyForColor ||
        cartItem?.quantity + quantity > qtyForSize
      ) {
        res.status(404).json({ message: "Not enough quantity to buy" });
        return;
      }
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

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findById(id);
    
    if (!cartItem) {
      res.status(404).json({ message: "No cart item found" });
      return;
    }

    const product = await Product.findById(cartItem.productId);
    if (!product) {
      await cartItem.deleteOne();
      res.status(404).json({ message: "No product found" });
      return;
    }

    if (quantity > product.available) {
      res.status(401).json({ message: "Not enough product available to buy" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);

    res.status(200).json({ message: "Success" });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
