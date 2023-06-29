import { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import Product from "../models/product";
import { Types } from "mongoose";

export const csrfProtect = csrf({ cookie: true });

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hashedPassword}`;
}

export const checkPasswordMatch = (
  password: string,
  hashedPassword: string
) => {
  const [salt, key] = hashedPassword.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (match) return true;
  return false;
};

export type QueryParameters = {
  q?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  offset?: string;
  category?: string;
  maxPrice?: string;
  minPrice?: string;
  vendor?: string;
  tags?: string;
  [key: string]: any;
};
/**
 * To process the incoming query parameteres
 */
export const parseQuery = ({
  q,
  category,
  maxPrice,
  minPrice,
  vendor,
  tags,
}: QueryParameters) => {
  let query: any = {};

  if (q) query = { $text: { $search: q.toString() } };

  if (maxPrice && minPrice) query.price = { $gte: minPrice, $lte: maxPrice };
  else if (maxPrice) query.price = { $lte: maxPrice };
  else if (minPrice) query.price = { $gte: minPrice };

  if (category) query.category = category;

  if (vendor) query.vendor = vendor;

  if (tags)
    // Match any of the specified tags
    query.tags = { $in: tags.split(",") };

  return query;
};
export function isInt(value: any) {
  let x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

type OrderedItemProp = {
  productId: Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: any;
  totalPrice: number;
};

export async function getOrderedItemsAndTotalPrice(
  cartItems: any[],
) {
  let totalPrice = 0;
  let orderedItems: OrderedItemProp[] = [];
  await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
  
      if (!product) return;
  
      const discount = (product.price * (product.discount || 0)) / 100;
      const individualPrice = (product.price - discount) * item.quantity;
      totalPrice += individualPrice;
  
      //Negate the quantity;
      product.available -= item.quantity;
      product.sold += item.quantity;
  
      orderedItems.push({
        productId: product._id,
        productName: product.title,
        productImage: product.imageSrc[0],
        productPrice: product.price,
        quantity: item.quantity,
        totalPrice: Math.round(individualPrice),
      });
      await product.save();
    })
  )

  return {items: orderedItems, totalPrice};
}

export const getUserDataFromBody = (body:any) => {
  let data:any = {}
  const { name, phoneNumber, displayPhoto, address } = body;
  if (name) data.name = name;
  if (phoneNumber) data.phoneNumber = phoneNumber;
  if (displayPhoto) data.displayPhoto = displayPhoto;
  if (address) {
    if (!data.address) data.address = {};
    if (address.apartment) data.address.apartment = address.apartment;
    if (address.area) data.address.area = address.area;
    if (address.city) data.address.city = address.city;
    if (address.country) data.address.country = address.country;
  }

  return data;
}

/*
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
*/
