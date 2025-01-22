const validator = require("validator");

const ValidateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    // Validate firstName and lastName
    if (!firstName || !lastName) {
        throw new Error("First Name and Last Name are required.");
    }

    if (
        !validator.isLength(firstName, { min: 4, max: 50 }) ||
        !validator.isLength(lastName, { min: 4, max: 50 })
    ) {
        throw new Error("First Name and Last Name must be between 4 to 50 characters.");
    }

    // Validate emailId
    if (!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid Email ID.");
    }

    // Validate password
    if (!validator.isStrongPassword(password, { minSymbols: 0 })) { // You can customize password strength rules
        throw new Error("Password must be strong: include at least 8 characters, 1 number, 1 uppercase, and 1 lowercase letter.");
    }

    // If all validations pass
    return { message: "Validation successful" };
};

const validateEditProfileData = (req) => {
        const allowedEditFields = [
               "firstName",
               "lastName",
               "photoUrl",
               "gender",
               "age",
               "about",
               "skills"
        ];
    const isEditAllowed = Object.keys(req.body).every((key) => 
               allowedEditFields.includes(key)
    )
  return isEditAllowed;
}

module.exports = { ValidateSignUpData ,validateEditProfileData};
