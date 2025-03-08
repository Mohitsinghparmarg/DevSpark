const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minLength: [4, "First name must be at least 4 characters long"],
            maxLength: [50, "First name cannot exceed 50 characters"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minLength: [4, "Last name must be at least 4 characters long"],
            maxLength: [50, "Last name cannot exceed 50 characters"],
            trim: true,
        },
        emailId: {
            type: String,
            lowercase: true,
            required: [true, "Email ID is required"],
            unique: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: (props) => `${props.value} is not a valid email address`,
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            validate: {
                validator: validator.isStrongPassword,
                message: "Password must be strong (include uppercase, lowercase, number, and symbol)",
            },
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
            default: "https://tse2.mm.bing.net/th?id=OIP.3MA_0QOJdlvH1c6K7VPW7QHaFI&pid=Api&P=0&h=220",
            validate: {
                validator: validator.isURL,
                message: (props) => `${props.value} is not a valid URL`,
            },
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

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Generate JWT token
userSchema.methods.getJWT = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "mohit@123", {
        expiresIn: "10d",
    });
};

// Validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    return await bcrypt.compare(passwordInputByUser, this.password);
};

module.exports = mongoose.model("User", userSchema);
