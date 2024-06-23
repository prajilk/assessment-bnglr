const express = require('express');
const router = express.Router();
const {
    login,
    register,
    verifyEmail,
    getProfile,
    forgotPassword,
    resetPassword
} = require('../controllers/UserController');
const { verifyToken } = require('../middleware/verifyToken');
const getUserId = require('../middleware/getUserId');

// Login user
router.post('/login', login);

// Create a new user
router.post('/register', register);

// Route to handle forgot password
router.post('/forgot-password', forgotPassword);

// Route to handle reset password
router.post('/reset-password', resetPassword);

// Verify user email while creating new account
router.post('/verify-email', verifyEmail);

// Authorize user request
router.get('/verify', verifyToken, (_, res) => {
    res.status(200).json({ message: "User verified successfully!" })
});

// Get user profile
router.get('/profile', getUserId, verifyToken, getProfile);

module.exports = router;