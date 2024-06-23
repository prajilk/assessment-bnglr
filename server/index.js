const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()

// Import routes
const userRouter = require('./src/routes/UserRoutes');
const blogRouter = require('./src/routes/BlogRoutes');

const PORT = process.env.PORT || 8000;

// Connect to the database
require('./src/config/db.js');

const app = express();

// Enable middlewares
app.use(express.json());
app.use(cookieParser());
// Enable CORS with credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/user', userRouter) // User Router
app.use('/api/blog', blogRouter) // Blog Router

app.get('/', (req, res) => {
    res.send('Server created successfully!');
});

app.listen(PORT, console.log(`Server running on Port: ${PORT}`));