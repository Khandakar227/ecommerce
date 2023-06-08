import { Request, Response } from "express";
import Product from "../models/product";
import { validationResult } from "express-validator";
import { QueryParameters, parseQuery, validateSizesAndColors } from "../libs";
import CartItem from "../models/cartItem";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const { limit, sortBy, sortOrder, offset, mode } = req.query as QueryParameters;

        // Process the query parameters
        const query = parseQuery(req.query);
        
        // Handle sort query
        let sortQuery: any = {};
        if (sortBy) sortQuery[sortBy] = sortOrder == 'desc' ? -1 : 1;
        //Handle limit of data
        let projection = {};
        if (mode) projection = {title: 1, available: 1, imageSrc: 1, rating: 1, price: 1, discount: 1};

        // Get product
        const products = await Product.find(query, projection)
            .limit(+(limit as string) || 20)
            .skip(+(offset as string) || 0)
            .sort(sortQuery);
        
        const count = await Product.find(query)
            .countDocuments();

        res.status(200).json({count, products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0].msg });

        const { title, desc, vendor, category, price, available, sold, unit, published, discount, rating, ratingCount, imageSrc, requireShipping, sizes, colors, tags } = req.body;

        // Add product
        const product = await Product.create({
            title, desc, vendor, category, price, available, sold, unit, published, discount, rating, ratingCount, imageSrc, requireShipping, sizes, colors, tags
        });
        await product.save();

        console.log(product);
        // console.log(req.body);
        res.status(201).json({ message: "New Product has been created", product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id as string);
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array()[0].msg });

        const { id } = req.params;
        const { title, desc, vendor, category, price, available, sold, unit, published, discount, rating, ratingCount, imageSrc, requireShipping,  sizes, colors, tags, } = req.body;

        if (!validateSizesAndColors({sizes, colors}))
        {
            res.status(400).json({message: "Invalid sizes or colors value"});
            return;
        }
        //Update product detail
        const product = await Product.findByIdAndUpdate(id, {
            title, desc, vendor, category, price, available, sold, unit, published, discount, rating, ratingCount, imageSrc, requireShipping, sizes, colors, tags
        });
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        /**
         * We need to find and update the cart items also like price, discount, quantity
         */
        await CartItem.updateMany({productId: id}, {
            $set: {productImage: product.imageSrc[0], productName: product.title, productPrice: product.price },
        });
        
        res.status(200).json({message: "Success" });
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        /**
         * We need to find and delete the cart items for this product
         */
        res.status(200).json({message: "Success"});
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong" });
    }
}
