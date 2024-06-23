const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const { sendMail } = require("../libs/sendMail")
const { createToken, hashPassword } = require("../libs/utils")

// Login function to handle user login requests
const login = async (req, res) => {
    try {
        if (req.body) {
            const { email, password } = req.body;

            // Check if email and password are provided
            if (!email || !password) {
                return res.status(400).json({ message: "Invalid value" });
            } else {
                // Find a user with the provided email
                const validUser = await User.findOne({ email });

                // Check if a user with the email exists
                if (!validUser) {
                    return res.status(401).json({ message: "Email not valid" });
                } else {
                    // Compare the provided password with the stored password
                    const passwordMatch = await bcrypt.compare(password, validUser.password);

                    // Check if the passwords match
                    if (passwordMatch) {
                        // Create a JSON Web Token (JWT) for the user
                        const token = createToken(validUser._id);

                        res.status(200).json({ token });
                    } else {
                        return res.status(401).json({ message: "Invalid user password" });
                    }
                }
            }
        } else {
            res.status(400).json({ message: "Invalid value" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Register function to handle user registration requests
const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if a user with the provided email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists..." });
        }

        // Create a new user with the provided details
        user = new User({ fullname, email, password, emailToken: crypto.randomBytes(64).toString("hex") });

        // Check if all fields are provided
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required..." });
        }

        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email must be a valid email..." });
        }

        // Hash the user's password using the hashPassword function
        user.password = await hashPassword(user.password);

        // Save the new user to the database
        await user.save();

        // Prepare email options for sending a verification email
        const mailOptions = {
            userMail: email,
            link: `${process.env.CLIENT_URL}/verifyEmail?emailToken=${user.emailToken}`,
            template: "email-template.handlebars",
            subject: "Verify Simple Blog"
        };

        // Send the verification email using the sendMail function
        sendMail(mailOptions);

        // Return a success response with the user's details
        res.status(200).json({ _id: user._id, fullname, email });
    } catch (error) {
        res.status(500).json(error);
    }
};

// ForgotPassword function to handle password reset requests
const forgotPassword = async (req, res) => {
    try {
        if (req.body) {
            const { email } = req.body;

            // Check if email is provided
            if (!email) {
                return res.status(400).json({ message: "Invalid value" });
            }

            // Check if the email is valid
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Email must be a valid email..." });
            }

            // Find a user with the provided email
            const validUser = await User.findOne({ email });

            // Check if a user with the email exists
            if (!validUser) {
                return res.status(401).json({ message: "Email not valid" });
            } else {
                // Create a JSON Web Token (JWT) for the user
                const token = createToken(validUser._id);

                // Prepare email options for sending a password reset link
                const mailOptions = {
                    userMail: email,
                    link: `${process.env.CLIENT_URL}/resetPassword?token=${token}`,
                    template: "forgot-password-template.handlebars",
                    subject: "Reset Password, Simple Blog"
                };

                // Send the password reset email using the sendMail function
                sendMail(mailOptions);

                // Return a success response
                res.status(200).json({ message: "Reset password link sent successfully!" });
            }
        } else {
            res.status(400).json({ message: "Invalid value" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// ResetPassword function to handle password reset requests
const resetPassword = async (req, res, next) => {
    try {
        if (req.body) {
            const { password, token } = req.body;

            // Check if password is provided
            if (!password) {
                return res.status(400).json({ message: "Invalid value" });
            }

            // Check if token is provided
            if (!token) {
                return res.status(400).json({ message: "Token not received" });
            }

            // Verify the token using the JWT secret key
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Check if the token is invalid
            if (typeof user === "string") {
                return res.status(403).json({ message: "Invalid signature" });
            }

            // Hash the new password using the hashPassword function
            const hashedPassword = await hashPassword(password);

            // Update the user's password in the database
            const result = await User.updateOne({ _id: user._id }, { password: hashedPassword });

            // Check if the update was successful
            if (!result.acknowledged) {
                return res.status(400).json({ message: "Invalid user ID" });
            }

            // Return a success response
            res.status(200).json({ message: "Password reset successfully" });
        } else {
            res.status(400).json({ message: "Invalid value" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// VerifyEmail function to handle email verification requests
const verifyEmail = async (req, res) => {
    try {
        const { emailToken } = req.body;

        // Check if the email token is provided
        if (!emailToken) {
            return res.status(404).json("EmailToken not found...");
        }

        // Find a user with the provided email token
        const user = await User.findOne({ emailToken });

        // Check if a user with the email token exists
        if (user) {
            // Set the email token to null and mark the user as verified
            user.emailToken = null;
            user.isVerified = true;

            // Save the updated user data
            await user.save();

            // Create a JSON Web Token (JWT) for the user
            const token = createToken(user._id);

            // Return a success response with the user data and token
            res.status(201).json({
                _id: user._id,
                fullname: user.name,
                email: user.email,
                token,
                isVerified: user.isVerified
            });
        } else {
            res.status(404).json({ message: "Email verification failed, invalid token!" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// GetProfile function to handle profile retrieval requests
const getProfile = async (req, res) => {
    try {
        // Extract the user ID from the request with the help of getUserId middleware
        const userId = req.user;

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        // Find a user with the provided user ID
        const user = await User.findOne({ _id: userId });

        // Return a success response with the user's profile data
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    login,
    register,
    verifyEmail,
    getProfile,
    forgotPassword,
    resetPassword
}