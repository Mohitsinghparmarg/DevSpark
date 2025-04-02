const validator = require("validator");


const ValidateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First Name and Last Name are required.");
    }

    if (
        !validator.isLength(firstName, { min: 4, max: 50 }) ||
        !validator.isLength(lastName, { min: 4, max: 50 })
    ) {
        throw new Error("First Name and Last Name must be between 4 to 50 characters.");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email ID. Please enter a valid email address.");
    }

    if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
        throw new Error(
            "Password must be at least 8 characters long and include at least 1 number, 1 uppercase, and 1 lowercase letter."
        );
    }

    return { message: "Validation successful" };
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "gender", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((key) => allowedEditFields.includes(key));

    if (!isEditAllowed) {
        throw new Error("Invalid fields in profile update request. Only allowed fields can be updated.");
    }

    return { message: "Profile update validation successful" };
};

module.exports = { ValidateSignUpData, validateEditProfileData };
