// console.log("hello world");
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

import connectDB from './db/databaseConnection.js'
connectDB();
