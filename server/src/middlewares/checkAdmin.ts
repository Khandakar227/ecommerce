import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = verify(req.cookies['access_token'], process.env.JWT_SECRET_KEY as string);

        if (token && typeof token !== 'string' && token.email == req.body.email && token.role === 'admin') next();
        else return res.status(403).json({ message: "You are not authorized" });
    
        } catch (error:any) {    
        console.log(error.message);
        return res.status(403).json({ message: "You are not authorized" });
    }
}