const express = require("express");  // Express.js framework for building web applications
const mongoose = require("mongoose");  // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
const bodyParser = require("body-parser");  // Body parsing middleware for Express.js to parse incoming request bodies
const cors = require("cors");  // Cross-Origin Resource Sharing (CORS) middleware for Express.js
const dotenv = require("dotenv");  // Dotenv module for loading environment variables from a .env file into process.env
const app = express();  // Create an Express application

require("dotenv").config();

const PORT = process.env.PORT || 8070;  /*when we import the web application to server we need to give a port number of a server 
to open our application. process.env.Port allow to use available port at the time we import 
web app to server or if we know the available ports on server we can directly give port number*/

app.use(cors());
app.use(bodyParser.json());  //json format mean the key value pairs

const URL = process.env.MONGODB_URL  //''; paste the exact url aswell here.

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection; // Get the default connection

connection.once("open", () => {
    console.log("MongoDB connection success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})


//do not change the stuff above here
//Import your router modules

const salonBookingRouter = require("./routes/salonBooking")
const studioBookingRouter = require("./routes/studioBooking")




app.use("/SalonBooking",salonBookingRouter)
app.use("/StudioBooking",studioBookingRouter)