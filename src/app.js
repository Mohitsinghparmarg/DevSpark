
const express = require('express');

const app = express();



app.use("/bhai/hii",(req,res) =>{
    res.send("bhaii hii this side mohit how are you ...")
})

app.use("/hello",(req,res) =>{
    res.send("hello ...")
})

app.use("/bhai",(req,res) =>{
    res.send("bhai...")
})

app.use("/bhai/hii",(req,res) =>{
    res.send("bhaii hii...")
})

app.use("/",(req,res) =>{
    res.send("hello bhai////...")
})
app.listen(7777,() =>{
       console.log("yes it is running")
});