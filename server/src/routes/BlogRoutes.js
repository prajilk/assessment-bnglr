const express = require('express');
const getUserId = require("../middleware/getUserId")
const {
    createPost,
    getAllPosts,
    getPostBySlug,
    editPost,
    getAllMyPosts,
    deletePost
} = require("../controllers/BlogController");
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// Get all blog posts (no authentication required)
router.get('/', getAllPosts);

// Get all blog posts by the current user (requires authentication and user ID)
router.get('/my-post', verifyToken, getUserId, getAllMyPosts);

// Get a blog post by its slug (no authentication required)
router.get('/:slug', getPostBySlug);

// Create a new blog post (requires authentication and user ID)
router.post('/', verifyToken, getUserId, createPost);

// Update a blog post (requires authentication and user ID)
router.put('/', verifyToken, getUserId, editPost);

// Delete a blog post by its ID (requires authentication and user ID)
router.delete('/:postId', verifyToken, getUserId, deletePost);

module.exports = router;