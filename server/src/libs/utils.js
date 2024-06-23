const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to hash a password using bcrypt
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// Function to create a JSON Web Token (JWT) for a user
const createToken = (_id) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "1d" });
};

// Function to create a Slug of the given title
function createSlug(title) {
    return title.replaceAll(" ", "-").toLowerCase();
}

module.exports = { createToken, hashPassword, createSlug };