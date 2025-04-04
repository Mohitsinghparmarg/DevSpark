const express = require("express");
const { ValidateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();

// Signup Route
authRouter.post("/signup", async (req, res) => {
    try {
        // Validate the incoming data
        ValidateSignUpData(req);

        const { firstName, lastName, emailId, password, gender, about, skills } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create and save the user (password hashing handled in the model)
        const user = new User({ firstName, lastName, emailId, password, gender, about, skills });
        const savedUser = await user.save();
        // Generate JWT token
        const token = savedUser.getJWT();

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
        });

        res.json({ message: "User Added Successfully!", data: savedUser })
    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message });
    }
});

// Login Route
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Validate the password
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = user.getJWT();

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message });
    }
});

// Logout Route
authRouter.post("/logout", (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful!" });
});

module.exports = authRouter;
