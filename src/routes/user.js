const express = require('express');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user

userRouter.get("/user/requests/received",userAuth,async (req,res) => {
         try{
                const loggedInUser = req.user;

                const connectionRequest = await connectionRequestModel.find({
                         toUserId: loggedInUser._id, 
                         status : "interested" 
                }).populate(
                    "fromUserId",
                    "firstName lastName photoUrl age gender about skills"
                );
               res.json({
                    message : "Data Fetched Successfully",
                    data : connectionRequest,
               })
         }
         catch(err){
            res.status(400).send({message : err.message});
         }
});

userRouter.get("/user/connections", userAuth,async (req,res) => {
         try{ 
               const loggedInUser = req.user;

               const connectionRequests = await connectionRequestModel.find({
                    $or: [
                        {
                            toUserId: loggedInUser._id,status:"accepted"
                        },
                        {
                            fromUserId: loggedInUser._id,status:"accepted"
                        },
                    ]
               }).populate("fromUserId",USER_SAFE_DATA)
                 .populate("toUserId",USER_SAFE_DATA);
               
               const data = connectionRequests.map((row) => {
                        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                           return row.toUserId;
                        }
                      return row.fromUserId;
               });

               res.json({data : data});
            }catch(err){
              res.status(400).send({message : err.message});
            }
})



module.exports = userRouter;