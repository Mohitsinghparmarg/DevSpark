const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Import routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Route handling
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database connection and server startup
connectDB()
    .then(() => {
        console.log("✅ Database connection established successfully.");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); 
    });

