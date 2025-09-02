import { ApiError } from '../utils/apierror.js';
import { ApiResponse } from '../utils/apiresponse.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/user.model.js';
import jwt from "jsonwebtoken"
// import { response } from 'express';

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const isExistUser = await User.findOne({ $or: [{ userName: userName.trim() }, { email: email.trim() }] });

        if (isExistUser) {
            throw new ApiError(400, "user already exists");
        }

        if (!validator.isEmail(email)) {
            throw new ApiError(400, "Email invalid");
        }

        if (password.length < 6) {
            throw new ApiError(400, "Password must be greater than 6");
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userImagePath = req.file?.path;
        
        console.log(userImagePath);

        if (!userImagePath) {
            throw new ApiError(400, "userImage file not found");
        }

        const userImage = await uploadOnCloudinary(userImagePath)

        console.log(userImage);

        if (!userImage) {
            throw new ApiError(400, "userImage not found on cloudinary");
        }

        const user = await User.create({
            userName: userName.trim(),
            email: email.trim(),
            userImage: userImage.url,
            password: hashedPassword
        })

        const createdUser = await User.findById(user._id).select(" -password ");

        if (!createdUser) {
            throw new ApiError(400, "user not created properly");
        }

        const savedUser = await createdUser.save();

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                savedUser,
                "User created successfully"
            ))

    } catch (error) {
        throw new ApiError(400, error.message);
    }

}

const signIn = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!userName || !email || !password) {
            throw new ApiError(400, "All fileds are required");

        }

        if (!validator.isEmail(email)) {
            throw new ApiError(400, "Invalid Email format");
        }

        const isExistUser = await User.findOne({ $or: [{ userName: userName.trim() }, { email: email.trim() }] })

        if (!isExistUser) {
            throw new ApiError(400, "User Not found");

        }

        const comaparePassword = bcrypt.compareSync(password, isExistUser.password);

        if (!comaparePassword) {
            throw new ApiError(400, "Invalid password");

        }

        const token = jwt.sign({ id: isExistUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })

        if (!token) {
            throw new ApiError(400, "Token not found");

        }

        const loggedInUser = await User.findById(isExistUser._id).select("-password");

        const options = {
            httpOnly: true,
            secure: false,
        };

        return res.status(200)
            .cookie("accessToken", token, options)
            .json(new ApiResponse(
                200,
                {
                    loggedInUser,
                    token
                },
                "User logged in successfully"
            ))

    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

const signOut = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: false,
        };
        return res.status(200)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, {}, "User logout successfully"))
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

export { register, signIn, signOut }