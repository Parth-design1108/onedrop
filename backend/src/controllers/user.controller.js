

import User from "../models/user.model.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const updateDetails = async (req, res) => {
    try {
        const { userName, email } = req.body;

        if (!userName || !email) {
            throw new ApiError(400, "All fields are required");
        }




        const updatedUser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    userName: userName.trim(),
                    email: email.trim()
                }
            },
            { new: true }
        )


        if (!updatedUser) {
            throw new ApiError(400, "User updation process failed");

        }

        const user = await updatedUser.save();

        return res.status(200)
            .json(new ApiResponse(200, user, "User updated successfully"));


    } catch (error) {
        throw new ApiError(400, error.message);

    }
}

const updateUserImage = async (req, res) => {
    try {
        const userImagePath = req.file?.path;

        if (!userImagePath) {
            throw new ApiError(404, "user image path not found");
        }

        const userImage = await uploadOnCloudinary(userImagePath);

        if (!userImage) {
            throw new ApiError(404, "User Image from Cloudinary not found");
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    userImage: userImage.url
                }
            },
            { new: true }
        ).select("-password");

        if (!user) {
            throw new ApiError(400, "userImage updation process failed")
        }

        return res.status(200)
            .json(
                new ApiResponse(200, user, "userImage updated successfully")
            )

    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPass, newPass } = req.body;

        console.log("req", req.body);


        if (!oldPass || !newPass) {
            throw new ApiError(400, "All fields are required");
        }

        const user = await User.findById(req.user?._id)

        console.log("user", user);


        if (!user) {
            throw new ApiError(400, "Invalid user");

        }

        const comparePass = bcrypt.compareSync(oldPass, user.password)

        console.log("pass", comparePass);


        if (!comparePass) {
            throw new ApiError(400, "Password not match");

        }

        const hashedNewPass = bcrypt.hashSync(newPass, 10);

        user.password = hashedNewPass;

        await user.save();

        return res.status(200)
            .json(new ApiResponse(200, {}, "Password changed successfully"))

    } catch (error) {
        throw new ApiError(400, error.message);

    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user?._id, { new: true });

        const Options = {
            httpOnly: true,
            secure: false,
        }
        return res.status(200)
            .clearCookie("accessToken", Options)
            .json(new ApiResponse(200, {}, "User Deleted successfully"))

    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

export { updateDetails, updateUserImage, changePassword, deleteUser }