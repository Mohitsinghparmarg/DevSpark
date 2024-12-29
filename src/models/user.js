const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minLength: [4, "First name must be at least 4 characters long"],
            maxLength: [50, "First name cannot exceed 50 characters"],
        },
        lastName: {
            type: String,
        },
        emailId: {
            type: String,
            lowercase: true,
            required: [true, "Email ID is required"],
            unique: true,
            trim: true,
            validate(value) {
                   if(!validator.isEmail(value)){
                         throw new Error("Invalid Email Address" + value)
                   }
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate(value) {
                  if(!validator.isStrongPassword(value)){
                        throw new Error("Your Password is not Strong" + value)
                  }
            }
        },
        age: {
            type: Number,
            min: [18, "Age must be at least 18"],
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
            default: "others",
        },
        photoUrl: {
            type: String,
            default:
                "https://tse2.mm.bing.net/th?id=OIP.3MA_0QOJdlvH1c6K7VPW7QHaFI&pid=Api&P=0&h=220",
                validate(value) {
                    if(!validator.isURL(value)){
                          throw new Error("Invalid Photo URL" + value)
                    }
             }
        },
        about: {
            type: String,
            default: "This user has not added any details about themselves.",
        },
        skills: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
