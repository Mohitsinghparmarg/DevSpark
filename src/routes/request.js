const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const connectionRequestModel = require("../models/connectionRequest");

// Send Connection Request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const { toUserId, status } = req.params;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Invalid status type: ${status}` });
        }

        // Prevent sending a request to self
        if (fromUserId.equals(toUserId)) {
            return res.status(400).json({ message: "You cannot send a connection request to yourself" });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if a connection request already exists
        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists" });
        }

        // Create and save the new connection request
        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.status(201).json({
            message: `${req.user.firstName} is ${status} to connect with ${toUser.firstName}`,
            data,
        });
    } catch (err) {
        res.status(500).json({ message: "ERROR: " + err.message });
    }
});

// Review Connection Request
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type" });
        }

        // Find the connection request
        const connectionRequest = await connectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found or already reviewed" });
        }

        // Update the request status
        connectionRequest.status = status;

        const updatedRequest = await connectionRequest.save();
        res.status(200).json({ message: `Connection request ${status}`, data: updatedRequest });

    } catch (err) {
        res.status(500).json({ message: "ERROR: " + err.message });
    }
});

module.exports = requestRouter;
