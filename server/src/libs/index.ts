import { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import Product from "../models/product";
import { ObjectId } from "mongodb";

export const csrfProtect = csrf({ cookie: true });


export function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");

    return `${salt}:${hashedPassword}`
}

export const checkPasswordMatch = (password: string, hashedPassword: string) => {
    const [salt, key] = hashedPassword.split(":");
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) return true;
    return false;
}

export type QueryParameters = {
    q?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    offset?: string;
    category?: string;
    maxPrice?: string;
    minPrice?: string;
    vendor?: string;
    tags?: string;
    [key: string]: any;
}
/**
 * To process the incoming query parameteres
 */
export const parseQuery = ({ q, category, maxPrice, minPrice, vendor, tags }: QueryParameters) => {
    let query: any = {};

    if (q) query = { $text: { $search: q.toString() } }

    if (maxPrice && minPrice) query.price = { $gte: minPrice, $lte: maxPrice };

    else if (maxPrice) query.price = { $lte: maxPrice };

    else if (minPrice) query.price = { $gte: minPrice };

    if (category) query.category = category;

    if (vendor) query.vendor = vendor;

    if (tags)
        // Match any of the specified tags
        query.tags = { $in: tags.split(',') };


    return query;
}
function isInt(value: any) {
    let x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

type Option = {
    name: string;
    priceDiff: number;
    quantity: number;
    _id: string
}
export const validateSizesAndColors = ({ sizes, colors }: { sizes: Option[], colors: Option[] }) => {
    let SizeIds = new Set();
    let ColorIds = new Set();
    let validity = 0;

    if (!sizes) validity++;
    else if (sizes.every(size => size.name && isInt(size.priceDiff) && isInt(size.quantity) && size._id && SizeIds.add(size._id) ))
    {
        validity++;
        if (SizeIds.size != sizes.length) validity--;
    }
    
    if (!colors) validity++;
    else if (colors.every(color => color.name && isInt(color.priceDiff) && isInt(color.quantity) && color._id && SizeIds.add(color._id) ))
    {
        validity++;
        if (ColorIds.size != colors.length) validity--;

    }    

    if (validity == 2) return true;
    else return false;
}

export const getProductFromCart = async (cartItem:any) => {
    const products = await Product.aggregate([
        {
          $match: {
            _id: new ObjectId(cartItem.productId),
            sizes: {
              $elemMatch: { _id: new ObjectId(cartItem.sizeId) },
            },
            colors: {
              $elemMatch: { _id: new ObjectId(cartItem.colorId) },
            },
          },
        },
        {
          $project: {
            available: 1,
            imageSrc: 1,
            price: 1,
            sizes: {
              $filter: {
                input: "$sizes",
                cond: { $eq: ["$$this._id", new ObjectId(cartItem.sizeId)] },
              },
            },
            colors: {
              $filter: {
                input: "$colors",
                cond: { $eq: ["$$this._id", new ObjectId(cartItem.colorId)] },
              },
            },
          },
        },
      ]);
    return products;     
}