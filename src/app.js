
const express = require("express");

const app = express();
 
app.get("/user",(req,res)=>{

      try{
            throw new Error("Something went wrong bhai!!!...");
            res.send("ohh No you Found some Errors!!!...");
      }
      catch(err){
            res.status(500).send("Something went wrong Mohit G");
      }
})

app.use("/",(err,req,res,next)=>{

      if(err){
          res.status(500).send("Something went wrong mohit bhai");
      }
})

  

app.listen(7777,()=>{
         console.log("server is running on 7777...")
})