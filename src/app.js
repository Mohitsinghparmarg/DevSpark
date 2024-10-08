
const express = require('express');

const app = express();



app.get("/user", (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
})

app.post("/user",(req,res) =>{
        res.send("data has been saved successfully!!!...")
})

app.delete("/user1",(req,res) => {
       res.send("data has been deleted successfully!!...")
})


// this will amtch all the HTTP method API calls to /test
app.use("/test",(req,res) =>{
    res.send("hello this is mohit")
})





app.listen(7777,() =>{
       console.log("Server is running successfully")
});