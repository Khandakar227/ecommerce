import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user';
import { csrfProtect } from './libs';
import productRoutes from './routes/products';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

connect(process.env.MONGODB_URL as string,
    {
        dbName: "ecommerce",
    })
    .then(_ => console.log("Connected to database"))
    .catch((error) => {
        console.log("connection failed! ", error);
    });

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/user', userRoutes);
    app.use('/product', productRoutes);

// this will send a csrfToken to the browser which needs to be saved and send on certain rquests (POST, UPDATE, DELETE)
app.get('/', csrfProtect, (req: Request, res: Response) => {
    res.json({_csrf: req.csrfToken()});
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
