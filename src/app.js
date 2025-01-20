
const express = require("express");
const connectDB =  require("./config/database");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

const User = require("./models/user");

const {ValidateSignUpData} = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser())

  app.post("/signup", async(req,res) => { 
       
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
  })

  app.post("/login" , async(req,res) => {
           
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
  })

  app.get("/profile",userAuth, async (req,res) => {
             
     try{
         const user = req.user;
         res.send(user);
     }catch(err){ 
        res.status(400).send("ERROR :" + err.message);
    }
  })

  app.post("/sendConnectionRequest",userAuth, async(req,res) =>{
               
    const user = req.user;
    console.log("Sending a connection request...");

    res.send(user.firstName + "sent the connection request...");
  })
  
connectDB()
      .then(() => {
            console.log("DataBase connection Established Successfully...");
            app.listen(7777,()=>{
                  console.log("server is running on 7777...")
         });
      })
      .catch((err) => {
            console.log("DataBase connection couldn't be Established")
      })
