
const express = require("express");

const connectDB =  require("./config/database");

const User = require("./models/user")

const app = express();

app.use(express.json());

  app.post("/signup", async(req,res) => {
            
        const user = new User(req.body);
      try{
            await user.save();
            res.send("the user data has been stored successfully");
      }
      catch(err){
             res.status(400).send(err.message);
      }
  })

  app.patch("/user/:userId", async (req, res) => {
      const userId = req.params?.userId;
      const data = req.body;
  
      if (!userId) {
          return res.status(400).json({ error: "userId is required" });
      }
  
      try {
          const ALLOWED_UPDATE = [
              "firstName",
              "lastName",
              "password",
              "age",
              "gender",
              "photoUrl",
              "about",
              "skills",
          ];
  
          // Validate keys in the update data
          const isUpdateAllowed = Object.keys(data).every((key) =>
              ALLOWED_UPDATE.includes(key)
          );
  
          if (!isUpdateAllowed) {
              return res.status(400).json({ error: "Update contains invalid fields" });
          }
  
          // Validate skills length if skills are provided
          if (data?.skills && Array.isArray(data.skills) && data.skills.length > 10) {
              return res.status(400).json({ error: "Skills cannot exceed 10 items" });
          }
  
          // Update the user
          const user = await User.findByIdAndUpdate(userId, data, {
              new: true, // Return the updated document
              runValidators: true, // Apply schema validations
          });
  
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }
  
          res.status(200).json({
              message: "User updated successfully",
              user,
          });
      } catch (err) {
          res.status(500).json({ error: "Something went wrong", details: err.message });
      }
  });
  
  


    
    
    
   

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
