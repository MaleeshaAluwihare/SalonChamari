// const router = require("express").Router(); // Import Express router
// const { User, validate } = require("../../Models/nisalka/user"); // Import User model and validation function
// const bcrypt = require("bcrypt"); // Import bcrypt for password hashing


// // Function to generate avatar initials
// function generateAvatarInitials(fullName) {
//     const names = fullName.split(" ");
//     const initials =
//       names[0].charAt(0).toUpperCase() + (names[1] ? names[1].charAt(0).toUpperCase() : "");
//     return initials;
//   }

// // Signup endpoint to register a new user
// router.post("/", async (req, res) => {
//     try {
//         // Validate user input data
//         const { error } = validate(req.body);
//         if (error)
//             return res.status(400).send({ message: error.details[0].message });

//         // Check if user with the same email already exists
//         const user = await User.findOne({ email: req.body.email });
//         if (user)
//             return res
//                 .status(409)
//                 .send({ message: "User with given email already exists!" });

//         // Hash the password using bcrypt before saving the user
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);


//         const avatarInitials = generateAvatarInitials(req.body.fullName);


//         // Create a new user with hashed password and save to database
//         await new User({ ...req.body, password: hashPassword,profilePicture: avatarInitials }).save();
//         res.status(201).send({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//         console.log(error);
//     }
// });

// // Endpoint to get all user data
// router.route("/display").get((req, res) => {
//     // Fetch all users from the database
//     User.find()
//         .then((users) => {
//             res.json(users); // Send JSON response with user data
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res.status(500).send({ status: "Error with get user", error: err.message });
//         });
// });

// // Endpoint to get user by email
// router.route("/get/:email").get(async (req, res) => {
//     let userEmail = req.params.email;

//     // Find user by email in the database
//     await User.findOne({ email: userEmail })
//         .then((user) => {
//             res.status(200).send({ status: "User fetched", user }); // Send JSON response with user data
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(500).send({ status: "Error with get user", error: error.message });
//         });
// });

// // Endpoint to update user by email
// router.route("/update/:email").put(async (req, res) => {
//     let userEmail = req.params.email;
//     const { fullName, password, phone, age, gender } = req.body;

//     // Hash the new password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const updateUser = {
//         fullName,
//         password: hashedPassword,
//         phone,
//         age,
//         gender,
        
//     };

//     // Find user by email and update user data
//     await User.findOneAndUpdate({ email: userEmail }, updateUser)
//         .then(() => {
//             res.status(201).json({
//                 status: "success",
//                 message: "User updated successfully",
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(500).send({ status: "Error with updating data" });
//         });
// });

// // Endpoint to delete user by email
// router.route("/delete/:email").delete(async (req, res) => {
//     let userEmail = req.params.email;

//     // Find user by email and delete from database
//     await User.findOneAndDelete({ email: userEmail })
//         .then(() => {
//             res.status(201).json({
//                 status: "success",
//                 message: "User deleted successfully",
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(500).send({ status: "Error with deleting", error: error.message });
//         });
// });

// module.exports = router; // Export the router with defined endpoints
