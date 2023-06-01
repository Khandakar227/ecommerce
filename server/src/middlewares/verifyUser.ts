import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type UserInfo = {
    email: string, _id: string, name: string, role: string, verified: string
}

export const verifyUserCookie = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = verify(req.cookies['access_token'], process.env.JWT_SECRET_KEY as string);

        if (token && typeof token !== 'string' && token.email == req.body.email) next();
        else
            return res.status(403).json({ message: "Failed to authenticate" });

    } catch (error: any) {
        console.log(error.message);
        return res.status(403).json({ message: "Failed to authenticate" });
    }
}

const parseCookies = (cookieString: string) => {
    let val: { [key: string]: any } = {};

    cookieString.split(';').forEach((item) => {
        const data = item.split('=');
        val[data[0]] = data[1];
    })

    return val
}
