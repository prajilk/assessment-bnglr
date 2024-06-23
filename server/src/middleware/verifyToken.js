const jwt = require('jsonwebtoken');

// Function to verify the token in the request
function verifyToken(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            );

            // Check if the decoded token is not a string (it should be an object)
            if (typeof decoded === "string") {
                throw new Error();
            }

            // Set the user ID from the decoded token to the request object
            req.user = decoded._id;

            next()
        } catch (error) {
            return res.status(403).json({ message: "Invalid signature" })
        }
    } else {
        return res.status(403).json({ message: "Auth token is missing!" })
    }
}

module.exports = { verifyToken }