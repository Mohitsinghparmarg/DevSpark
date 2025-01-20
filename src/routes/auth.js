
const express = require("express");
const { ValidateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt")
const User = require("../models/user");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();

authRouter.post("/signup", async(req,res) => { 
       
    try{
         
         // validation of data 
          ValidateSignUpData(req);

          const {firstName,lastName,emailId,password} = req.body;

          // Encrypt the password
          const passwordHash = await bcrypt.hash(password,10);
         

          const user = new User({
               firstName,
               lastName,
               emailId,
               password : passwordHash
          });
          await user.save();
          res.send("the user data has been stored successfully");
    }
    catch(err){
           res.status(400).send("ERROR :" + err.message);
    }
});


authRouter.post("/login" , async(req,res) => {
           
        try{
            const {emailId,password} = req.body;

            const user = await User.findOne({emailId : emailId});

            if(!user){
                 throw new Error("Invalid Credentials...");
            }
    
            const isPasswordValid = await user.validatePassword(password);
    
            if(isPasswordValid){


                const token = await user.getJWT();
                
                res.cookie("token",token,{
                     expires: new Date(Date.now() + 6 * 12000)
                });
                res.send("Login Successfully...");
            }
            else{
                throw new Error("Invalid Credentials...");
            }
        }catch(err){
            res.status(400).send("ERROR :" + err.message);
        }
  });


module.exports = authRouter;