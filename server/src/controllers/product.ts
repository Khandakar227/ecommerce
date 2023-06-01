import { Request, Response } from "express";
import Product from "../models/product";
import { validationResult } from "express-validator";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { } = req.query;

        // Get product
    
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

        const { title, desc, vendor, category, price, available, sold, unit, published, discount, rating, ratingCount, imageSrc, requireShipping, options, } = req.body;
        
        // Add product

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}