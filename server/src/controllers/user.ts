import { Request, Response } from "express";
import { validationResult } from "express-validator";

import jwt from "jsonwebtoken";
import User from "../models/user";
import { checkPasswordMatch, getUserDataFromBody, hashPassword } from "../libs";

export const signUp = async (req: Request, res: Response) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty())
            return res.status(401).json({
                message: error.array()[0].msg
            })

        const { name, phoneNumber, email, password, displayPhoto, address } = req.body;

        const checkEmail = await User.findOne({ email });
        if (checkEmail) return res.status(400).json({ message: "Email is already in use" });


        const hash = hashPassword(password); //Hash the password

        const user = new User({
            email,
            name,
            password: hash,
            authType: 'email',
            displayPhoto,
            phoneNumber,
            address: {
                houseNo: address?.houseNo,
                city: address?.city,
                country: address?.country,
            },
            role: 'user',
        });
        //Add the user to the database
        await user.save();

        //
        // Verification mail should be send
        //

        res.status(201).json({
            message:
                "Account successfully created!. Check your email. A verification link was sent.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors.array()[0].msg });

        const { email, password, role } = req.body;
        
        const user = await User.findOne({ email, role });
        if (!user) return res.status(401).json({ message: "Incorrect email or password" });

        const isPasswordMatched = checkPasswordMatch(password, user.password as string)

        if (!isPasswordMatched) return res.status(401).json({ message: "Incorrect email or password" });

        user.signedInAt = new Date();
        await user.save();

        const userInfo = {
            email: user.email, _id: user._id, name: user.name, role: user.role, verified: user.verified
        }

        const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY as string, { expiresIn: 3_600_000 * 4 });

        res.status(200)
            .cookie('access_token', token, { maxAge: 3_600_000 * 4, httpOnly: true })
            .json({ message: "success", user: {...userInfo, signedInAt: user.signedInAt, expiresIn: 3_600_000 * 4} });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

        const updateData = getUserDataFromBody(req.body);
        const userId = res.locals.user._id;
        const user = await User.findByIdAndUpdate(userId, updateData);

        res.status(200).json({ message: "updated successfully", user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.status(200).clearCookie('access_token').json({message: "Logged out"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}