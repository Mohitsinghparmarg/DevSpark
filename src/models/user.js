
const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
        firstName : {
              type : String
        },
        lastName : {
            type : String
        },
        emailId : {
             type : String
        },
        password : {
             type : String
        },
        age : {
             type : Number
        },
        gender : {
            type : String
        }
})
module.exports = mongoose.model("user",userScema);