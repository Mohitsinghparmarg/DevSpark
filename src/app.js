
const express = require("express");

const connectDB =  require("./config/database");

const app = express();

app.use(express.json());

const User = require("./models/user");



app.patch("/user", async (req,res) => {
        
      const emailId = req.body.emailId;
      const data = req.body;
      // console.log(data);
      try{
            const user =  await User.findOneAndUpdate({emailId : emailId},data,{returnDocument : "after"});
            console.log(user);
            res.send("user updated successfully...");
      }catch(err){
            console.log(err.message);
            res.status(400).send("Something went wrong...");
      } 
})

app.patch("/user", async (req,res) => {
        
      const UserId = req.body.UserId;
      const data = req.body;
      // console.log(data);
      try{
            const user =  await User.findByIdAndUpdate({_id : UserId},data,{returnDocument : "after"});
            console.log(user);
            res.send("user updated successfully...");
      }catch(err){
            res.status(400).send("Something went wrong...");
      } 
})



// app.delete("/user",async (req,res) =>{
         
//    const UserId = req.body.UserId;
//     try 
//      {
//       //   const user = await User.findByIdAndDelete(UserId);
//         const user = await User.findByIdAndDelete({_id : UserId});
//         res.send("user deleted successfully...");
//     }
//     catch(err){
//          res.status(400).send("Something went wrong...");
//       }
// })


// app.get("/user", async (req,res) => {
         
//        const UserEmail = req.body.emailId;


//         try{
//             console.log("yes it is...")
//               const user = await User.findOne({emailId : UserEmail});
             
//             if(!user){
//                   res.status(404).send("user not found...");
//             }
//             else{
//                   res.send(user);
//             }
//       //        const users = await User.find({emailId : UserEmail});
//       //        if(users.length === 0){
//       //             res.status(404).send("user not found...");
//       //        }
//       //        else{
//       //              res.send(users);
//       //        }

//        } catch(err){
//                res.send(400).send("Something went wrong...");
//        }

     
// })


// app.get("/feed", async(req,res) => {
       
//       try {
//              const AllUsers = await User.find({});
//              res.send(AllUsers);
     
//       }
//       catch(err){
//              res.status(400).send("these is Error!!!")
//       }
// })



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
