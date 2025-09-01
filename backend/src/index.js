import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

// cors policy 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


import connectDB from "./db/databaseConnection.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentrouter from './routes/comment.route.js'

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Servere is running on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Server connection failed", error);
  });

//routes
app.use("/api/auth", authRouter);
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);
app.use("/api/comment" , commentrouter);
