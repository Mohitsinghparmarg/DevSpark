

const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect(
              "mongodb+srv://mohitparmar1501:p20o52WLv71QUfCY@nodejs.crawi.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS"
        )
};
module.exports = connectDB;