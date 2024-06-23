const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const { createSlug } = require("../libs/utils")

// CreatePost function to handle post creation requests
const createPost = async (req, res) => {
    try {
        const { title, summary, image, content } = req.body;
        const userId = req.user; // Get the user ID from the getUserId middleware

        // Check if all required fields are filled
        if (!title || !summary || !content) {
            return res.status(400).json({ message: "Fill the required field." });
        }

        // Create a slug for the post title
        const slug = createSlug(title);

        // Create a new blog post with the provided data
        await Blog.create({ title, summary, content, image, userId, slug });

        // Return a success response
        res.status(201).json({ message: "Post successfully created." });
    } catch (error) {
        res.status(500).json(error);
    }
};

// EditPost function to handle post editing requests
const editPost = async (req, res) => {
    try {
        const { title, summary, image, content, _id, userId } = req.body;
        const user = req.user; // Get the user from the getUserId middleware

        // Check if all required fields are filled
        if (!title || !summary || !content) {
            return res.status(400).json({ message: "Fill the required field." });
        }

        // Check if the user is authorized to edit the post
        if (userId !== user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        // Create a slug for the post title
        const slug = createSlug(title);

        // Update the post with the provided data
        const result = await Blog.updateOne({ _id }, { title, summary, content, image, slug });

        // Check if the update was successful
        if (result.acknowledged) {
            res.status(200).json({ message: "Post successfully updated.", slug });
        } else {
            res.status(400).json({ message: "Unable to update post!" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
};

// DeletePost function to handle post deletion requests
const deletePost = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const { postId } = req.params;
        const user = req.user; // Get the user from the getUserId middleware

        // Check if the post ID is provided
        if (!postId) {
            return res.status(400).json({ message: "Missing post ID" });
        }

        // Delete the post with the provided ID and user ID
        const result = await Blog.deleteOne({ _id: postId, userId: user });

        // Check if the deletion was successful
        if (result.acknowledged) {
            // Return a success response
            res.status(200).json({ message: "Post successfully deleted." });
        } else {
            res.status(400).json({ message: "Unable to delete post!" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
};

// GetAllPosts function to handle getting all blog posts
const getAllPosts = async (_, res) => {
    try {
        // Use MongoDB aggregation pipeline to fetch all blog posts with author details
        const allBlogs = await Blog.aggregate([
            { $lookup: { from: "users", foreignField: "_id", localField: "userId", as: "author" } },
            { $unwind: "$author" },
            {
                $project: {
                    'author.password': 0,
                    'author.emailToken': 0
                }
            }
        ]);

        // Return the result in reverse order (newest posts first)
        res.status(200).json(allBlogs.reverse());

    } catch (error) {
        res.status(500).json(error);
    }
};

// GetAllMyPosts function to handle getting all blog posts of the current user
const getAllMyPosts = async (req, res) => {
    try {
        const userId = req.user;
        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Use MongoDB aggregation pipeline to fetch all blog posts of the current user
        const allMyBlogs = await Blog.aggregate([
            { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },
            { $lookup: { from: "users", foreignField: "_id", localField: "userId", as: "author" } },
            { $unwind: "$author" },
            {
                $project: {
                    'author.password': 0,
                    'author.emailToken': 0
                }
            }
        ]);

        // Return the result in reverse order (newest posts first)
        res.status(200).json(allMyBlogs.reverse());

    } catch (error) {
        res.status(500).json(error);
    }
};

// GetPostBySlug function to handle getting a single blog post by its slug
const getPostBySlug = async (req, res) => {
    try {
        // Get the slug from the request parameters
        const { slug } = req.params;

        // Use MongoDB aggregation pipeline to fetch the blog post and author details by its slug
        const post = await Blog.aggregate([
            { $match: { slug } },
            { $lookup: { from: "users", foreignField: "_id", localField: "userId", as: "author" } },
            { $unwind: "$author" },
            {
                $project: {
                    "author.password": 0,
                    'author.emailToken': 0
                }
            }
        ]);

        // Check if the post exists
        if (post.length === 0) {
            return res.status(400).json({ message: "Invalid post ID!" });
        }

        res.status(200).json(post[0]);

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { createPost, getAllPosts, getPostBySlug, editPost, getAllMyPosts, deletePost }