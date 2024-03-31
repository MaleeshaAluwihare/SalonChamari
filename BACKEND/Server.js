const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors  = require("cors");
const dotenv = require("dotenv");
const app = express();

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

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
})
const clientRouter=require("./Routes/nisalka_C/Client.js");

app.use("/Client", clientRouter);
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})