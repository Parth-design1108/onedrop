import { ApiError } from "../utils/apierror.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/apiresponse.js";

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            throw new ApiError(404, "All fields are required");
        }

        const postImagePath = req.file?.path;

        if (!postImagePath) {
            throw new ApiError(404, "Post Image path not found");
        }

        const postImage = await uploadOnCloudinary(postImagePath);

        if (!postImage) {
            throw new ApiError(404, "PostImage from cloudinary not found");
        }

        const slug = req.body.title
            .split(" ")
            .join("-")
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, "");

        const post = await Post.create({
            title,
            content,
            postImage: postImage.url,
            userId: req.user._id,
            slug
        })

        if (!post) {
            throw new ApiError(404, "Post creation process failed")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, post, "Post created successfully")
            )

    } catch (error) {
        throw new ApiError(404, error.message);
    }
}
const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            throw new ApiError(404, "postId not found");

        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "post not found");

        }

        if (post.userId.toString() !== req.user?._id.toString()) {
            throw new ApiError(404, "You are not allowed to delete post")
        }

        Post.findByIdAndDelete(postId);

        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "post deleted successfully")
            )


    } catch (error) {
        throw new ApiError(404, error.message);

    }
}
const getAllPosts = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;

        const allPosts = await Post.find()
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit)

        if (!allPosts) {
            throw new ApiError(404, "Posts not found");
        }

        const totalPosts = await Post.countDocuments();

        return res
            .status(200)
            .json(
                new ApiResponse(200, { allPosts, totalPosts }, "All posts are fetched Successfully")

            )

    } catch (error) {
        throw new ApiError(404, error.message);
    }
}

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId);


        if (!postId) {
            throw new ApiError(404, "post Id not found");
        }

        const post = await Post.findById(postId);

        if (!post) {
            throw new ApiError(404, "Post not found")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, post, "Post fetched successfully"));
    } catch (error) {
        throw new ApiError(404, error.message);
    }
}

export { createPost, deletePost, getAllPosts, getPostById }