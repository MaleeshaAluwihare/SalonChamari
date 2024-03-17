const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors  = require("cors");
const dotenv = require("dotenv");
const app = express();


const incomeRouter = require("./Routes/pulasthi-routes/incomes");
const budgetRouter = require("./Routes/pulasthi-routes/budgets");
const expenseRouter = require("./Routes/pulasthi-routes/expenses.js");
const empSalaryRouter = require("./Routes/pulasthi-routes/empSalaries.js");
const inventoryItemRouter = require("./Routes/pulasthi-routes/inventoryItems.js");
const eventPackageRouter = require("./Routes/pulasthi-routes/eventPackages.js");
const searchRouter = require("./Routes/Maleesha/searchService");



require("dotenv").config();

const PORT = process.env.PORT || 8070;  /*when we import the web application to server we need to give a port number of a server 
to open our application. process.env.Port allow to use available port at the time we import 
web app to server or if we know the available ports on server we can directly give port number*/

app.use(cors());
app.use(bodyParser.json());  //json format mean the key value pairs

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})



//when data passing to frontend to backend its calling a url (http://localhost:8070/service) then the services.js in routes will be loaded.
//pulasthi
app.use("/finance",incomeRouter);
app.use("/finance",expenseRouter);
app.use("/finance",budgetRouter);
app.use("/finance",empSalaryRouter);
app.use("/finance",inventoryItemRouter);
app.use("/finance",eventPackageRouter);

//Maleesha
app.use("/services",searchRouter)

