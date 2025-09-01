import express from "express";
import { createComment, deleteComment, getCommentsByPost } from "../controllers/comment.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const commentrouter = express.Router();

commentrouter.post("/create-comment", verifyJWT, createComment);

commentrouter.get("/get-post-comments/:postId", getCommentsByPost);

commentrouter.delete("/delete-comment/:commentId", verifyJWT, deleteComment);

export default commentrouter;