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

