import Comment from "../models/comment.model.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    if (!content || !postId) {
      throw new ApiError(400, "Content and Post ID are required");
    }

    const comment = await Comment.create({
      content,
      userId: req.user._id,
      postId
    });

    return res.status(201).json(
      new ApiResponse(201, comment, "Comment created successfully")
    );
  } catch (error) {
    throw new ApiError(400, error.message)
  }
};


const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw new ApiError(400, "Post ID is required");
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(200, comments, "Comments fetched successfully")
    );
  } catch (error) {
    throw new ApiError(400, error.message)
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      throw new ApiError(400, "Comment ID is required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(404, "You are not allowed to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
      new ApiResponse(200, {}, "Comment deleted successfully")
    );
  } catch (error) {
    throw new ApiError(400, error.message)
  }
};

export { createComment, deleteComment, getCommentsByPost};