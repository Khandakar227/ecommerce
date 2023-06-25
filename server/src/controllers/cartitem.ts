import { Request, Response } from "express";
import { validationResult } from "express-validator";
import CartItem from "../models/cartItem";
import Product from "../models/product";

const MAXIMUM_CARTITEM = 20;

export const getCartItems = async (req: Request, res: Response) => {
  try {
   console.log(res.locals.user);
   const cartItems = await CartItem.find({userId: res.locals.user._id});

   res.status(200).json({cartItems});
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const addToCart = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(401).json({
        message: error.array()[0].msg,
      });
    // Get the product information from the given product Id
    const { quantity, productId } = req.body;

    const product = await Product.findOne({
      _id: productId,
      available: { $gt: quantity - 1 },
    });

    // Send 404 if the product id is invalid or not found
    if (!product) {
      res.status(404).json({
        message: "The product not found",
      });
      return;
    }

    //If the product exists make sure if the product was previously added to the cart or not
    let cartItem = await CartItem.findOne({
      productId,
      userId: res.locals.user._id,
    });

    //if added than we only need to update the cartItem
    if (!cartItem) {
      
      const cartCount = await CartItem.count({userId: res.locals.user._id});
      console.log("cart count:", cartCount)
      
      if (cartCount > MAXIMUM_CARTITEM)
          return res.status(403).json({message: "Maximum cart items reached"});

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
      });

      await cartItem.save();
    } else {
      cartItem.quantity += quantity;

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
    res.status(200).json({message: 'Updated', cartItem});
    
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
