import { NextFunction, Request, Response } from "express";
import csrf from "csurf";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

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
    [key:string]: any;
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


