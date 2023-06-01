// import { NextFunction, Request, Response } from "express";
import csrf from "csurf";

export const csrfProtect = csrf({ cookie: true });
