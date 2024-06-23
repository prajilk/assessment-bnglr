const jwt = require('jsonwebtoken');

// Define a middleware function to extract the user ID from the request
function getUserId(req, _, next) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            );

            // Extract the user ID from the decoded token and set to request object
            req.user = decoded._id;

            next()
        } catch (error) {
            next()
        }
    } else {
        next()
    }
}

module.exports = getUserId