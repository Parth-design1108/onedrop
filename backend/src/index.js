// console.log("Hello world");

import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})


import authRouter from "../src/routes/auth.route.js";
import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());

import connectDB from './db/databaseConnection.js';
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

//connection logic
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
    console.log("Server Running on port", process.env.PORT)
});
}).catch((error) => {
    console.log("server connection failed", error);
});


//Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post",postRouter);