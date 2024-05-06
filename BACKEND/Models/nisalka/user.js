// Import necessary modules
const mongoose = require("mongoose"); // MongoDB ORM
const jwt = require("jsonwebtoken"); // JSON Web Token for authentication
const Joi = require("joi"); // Input validation library

// Define user schema for MongoDB
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, // User's full name
    email: { type: String, required: true }, // User's email (unique)
    phone: { type: String, required: true }, // User's phone number
    age: { type: String, required: true }, // User's age
    gender: { type: String, required: true }, // User's gender
    password: { type: String, required: true }, // User's password
    lastLogin: { type: Date, default: Date.now },// lastlogin
    profilePicture: { type: String},//profile photo
   
});


// Method to generate authentication token for a user
userSchema.methods.generateAuthToken = function () {
    // Generate token using JWT with user's ID, valid for 7 days
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

// Create a MongoDB model for users using the defined schema
const User = mongoose.model("users", userSchema);


// Function to validate user input data using Joi schema
const validate = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("Full Name"), // Full name validation
        email: Joi.string().email().required().label("Email"), // Email validation
        phone: Joi.string().required().label("Phone"), // Phone number validation
        age: Joi.string().required().label("Age"), // Age validation
        gender: Joi.string().required().label("Gender"), // Gender validation
        password: Joi.string().required().label("Password"), // Password validation
        
    });
    return schema.validate(data); // Validate input data against the schema
};

// Export User model and validate function for external use
module.exports = { User, validate };
