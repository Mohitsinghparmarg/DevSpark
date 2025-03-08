const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "Please log in to access this resource." });
        }

        // Verify the token
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObj;

        // Find the user by ID
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found. Authentication failed." });
        }

        // Attach the user object to the request
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Authentication error", error: err.message });
    }
};

module.exports = { userAuth };
