// // Import necessary modules
// const router = require("express").Router(); // Import Express router
// const { User } = require("../../Models/nisalka/user"); // Import User model
// const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
// const Joi = require("joi"); // Import Joi for input validation

// // Set the time zone to Indian Standard Time (+05:30)
// process.env.TZ = "Asia/Kolkata";

// // POST endpoint for user login
// router.post("/", async (req, res) => {
//     try {
//         // Validate user input data using Joi schema
//         const { error } = validate(req.body);
//         console.log(req.body); // Log the request body for debugging

//         if (error)
//             return res.status(400).send({ message: error.details[0].message });

//         // Find user by email in the database
//         const user = await User.findOne({ email: req.body.email });
//         console.log('user:', user); // Log the user object for debugging

//         // If user with the provided email doesn't exist, return error
//         if (!user)
//             return res.status(401).send({ message: "Invalid Email or Password" });

//         // Compare the provided password with the hashed password in the database
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         );

//         // If password is invalid, return error
//         if (!validPassword)
//             return res.status(401).send({ message: "Invalid Email or Password" });

//         // Update the lastLogin timestamp to current time with the time zone offset
//         const now = new Date();
//         const offsetInMs = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
//         const lastLoginTime = new Date(now.getTime() + offsetInMs).toLocaleString('en-US', { timeZoneName: 'short' });
//         user.lastLogin = lastLoginTime;
//         await user.save();

//         // Generate authentication token for the user
//         const token = user.generateAuthToken();
//         res.status(200).send({ data: token, email: req.body.email, message: "Logged in successfully" });
//     } catch (error) {
//         console.error(error); // Log any internal server errors
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// // Function to validate user input data using Joi schema
// const validate = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("Email"), // Email validation
//         password: Joi.string().required().label("Password"), // Password validation
//     });
//     return schema.validate(data);
// };

// module.exports = router; // Export the router with defined authentication endpoints
