import express from 'express';  
import "dotenv/config"; // Automatically loads environment variables from .env file
import authRoutes from './routes/auth.route.js'; // Importing the auth routes
import { connectDB } from './lib/db.js'; // Importing the database connection function
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import userRoutes from './routes/user.route.js'; // Importing user routes
import { protectRoute } from './middleware/auth.middleware.js'; // Importing the protectRoute middleware
import chatRoutes from './routes/chat.route.js'; // Importing chat routes
import cors from 'cors'; // Importing CORS middleware
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin:"http://localhost:5173", // Allow requests from the frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
})); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes); // Assuming you have user routes defined in user.route.js
app.use ("/api/chat",chatRoutes); // Assuming you have chat routes defined in chat.route.js

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB(); // Connect to the database when the server starts
})
