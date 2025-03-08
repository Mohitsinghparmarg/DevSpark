const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all pending connection requests for the logged-in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModel
            .find({ toUserId: loggedInUser._id, status: "interested" })
            .populate("fromUserId", USER_SAFE_DATA);

        res.status(200).json({
            message: "Pending connection requests fetched successfully",
            count: connectionRequests.length,
            data: connectionRequests,
        });
    } catch (err) {
        res.status(500).json({ message: "ERROR: " + err.message });
    }
});

// Get all accepted connections for the logged-in user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModel
            .find({
                $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" },
                ],
            })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        // Extract connection users
        const connections = connectionRequests.map((req) =>
            req.fromUserId._id.equals(loggedInUser._id) ? req.toUserId : req.fromUserId
        );

        res.status(200).json({
            message: "Connections fetched successfully",
            count: connections.length,
            data: connections,
        });
    } catch (err) {
        res.status(500).json({ message: "ERROR: " + err.message });
    }
});

// Get users for the feed (excluding connected users and logged-in user)
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;
        limit = limit > 50 ? 50 : limit; // Limit to max 50 users per page
        const skip = (page - 1) * limit;

        // Find all connected user IDs
        const connectionRequests = await connectionRequestModel
            .find({ $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }] })
            .select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        hideUsersFromFeed.add(loggedInUser._id.toString());

        // Fetch users not in connections and not the logged-in user
        const users = await User.find({ _id: { $nin: Array.from(hideUsersFromFeed) } })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Feed fetched successfully",
            page,
            limit,
            count: users.length,
            data: users,
        });
    } catch (err) {
        res.status(500).json({ message: "ERROR: " + err.message });
    }
});

module.exports = userRouter;
