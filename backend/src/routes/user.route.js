import {upload} from "../middleware/multer.middleware.js"
import express from 'express';
import { updateDetails, changePassword, deleteUser, updateUserImage } from "../controllers/user.controller.js";
import verifyJWT from '../middleware/auth.middleware.js';
const userRouter = express.Router();

userRouter.route("/update-details").patch(verifyJWT, updateDetails);

userRouter.route("/change-password").post(verifyJWT, changePassword);

userRouter.route("/update-user-image").patch(
    verifyJWT,
    upload.single("userImage"),
    updateUserImage);

userRouter.route("/delete-user").delete(verifyJWT, deleteUser);


export default userRouter;