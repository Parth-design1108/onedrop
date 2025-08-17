console.log("hello world");
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import authRouter from "../src/routes/auth.route.js";

dotenv.config({
    path: './.env'

})

import express from 'express'
const app = express();

app.use(cookieParser());

app.use(express.json());

import connectDB from './db/databaseConnection.js'
import userRouter from "./routes/user.route.js";

// connection logic
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on port", process.env.PORT);

    });
}).catch((error) => {
    console.log("Server connection failed", error);

});


app.use("/api/auth", authRouter);

app.use("/api/user",userRouter);






