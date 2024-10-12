
const express = require("express");

const connectDB =  require("./config/database");

const app = express();

app.use(express.json());
const User = require("./models/user");

app.post("/signup", async (req,res) => {
         
        const user = new User (req.body)
      try{
            await user.save();
            res.send("user data has been successfully added...");
      }catch(err){
            res.send(400).send("Error found :" + err.message);
      }
     
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
