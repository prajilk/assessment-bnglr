const mongoose = require('mongoose');

// Load environment variables from a.env file using the dotenv library
require('dotenv').config();

// Define an immediately invoked async function to connect to the database
(async () => {
    try {
        // Connect to the MongoDB database using the URI 
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to database.');
    } catch (error) {
        console.error(error.message)
    }
})();