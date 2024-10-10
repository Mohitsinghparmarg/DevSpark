
const express = require("express");

const app = express();

app.use("/",
       (req,res,next) =>{
          console.log("it is first one...")
          next();
         // res.send("1st Route handler...");
     })

app.get("/user",(req,res,next)=> {
          console.log("it is the second one...");
          next();
         // res.send("2nd Route handler...");
   },
  (req,res,next)=> {
       console.log("it is the fourth one...");
       res.send("4th Route handler...");
 });
  

app.listen(7777,()=>{
         console.log("server is running on 7777...")
})