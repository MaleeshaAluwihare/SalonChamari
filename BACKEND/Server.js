const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors  = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')



const incomeRouter = require("./Routes/pulasthi-routes/incomes");
const budgetRouter = require("./Routes/pulasthi-routes/budgets");
const expenseRouter = require("./Routes/pulasthi-routes/expenses.js");
const empSalaryRouter = require("./Routes/pulasthi-routes/empSalaries.js");
const inventoryItemRouter = require("./Routes/pulasthi-routes/inventoryItems.js");
const eventPackageRouter = require("./Routes/pulasthi-routes/eventPackages.js");


const studioBookingRouter = require("./Routes/Chavidu/studioBooking.js");
const SalonItemTimeRouter = require("./Routes/Chavidu/salonServiceTime.js");
const StudioPackageRouter = require("./Routes/Chavidu/studioPackage.js");
const StudioImageHandling = require("./Routes/Chavidu/studioImages.js");
const StudioPackageImageView = require("./Routes/Chavidu/displayPackageImage.js");
const salonBookingRouter = require("./Routes/Chavidu/salonBooking.js");

const servicesRouter = require("./Routes/Maleesha/servicesRoute");
const imageUploadRouter = require("./Routes/Maleesha/imageUploadRoute.js");
const quotationRouter = require("./Routes/Maleesha/quotationRoute.js");
const MailRouter = require("./Routes/Maleesha/mailRoute.js");

const userRoutes = require("./Routes/nisalka/users.js");
const authRoutes = require("./Routes/nisalka/auth.js");
const forgotRoutes = require("./Routes/nisalka/ForgotPass.js")
const massmailRoutes = require("./Routes/nisalka/MassEmails.js")

const studioInventory = require("./Routes/Anoj/studioR.js");

const EmpAttendence = require("./Routes/Yasiru/EmpAttendance.js");
const Attendancecount = require("./Routes/Yasiru/AttendanceCount.js") ;
const Leave = require("./Routes/Yasiru/Leave.js");
const sendMailRouter=require("./Routes/Yasiru/MailRoute.js");
const ImageRoute=require("./Routes//Yasiru/ImageRoute.js");
const salonRouter=require("./Routes/Yasiru/Saloon.js");

const faqsRouter = require("./Routes/Dasun/faqsRoute.js");
const feedbacksRouter = require("./Routes/Dasun/FeedbackRoute.js");
const customerMessageRouter = require("./Routes/Dasun/CustomerMessageRoute.js");
const messageReplyRouter = require("./Routes/Dasun/MessageReplyRoute.js");
const blogRouter = require("./Routes/Dasun/BlogRoute.js");
const commentRouter = require("./Routes/Dasun/CommentRoute.js");

const clientRouter = require("./Routes/devinda/clients")
const packageRouter = require("./Routes/devinda/ePackageroutes")
const EManagerRouter = require("./Routes/devinda/EManager")
const ECPackageRouter = require("./Routes/devinda/eCPackageroutes")
require("dotenv").config();

const PORT = process.env.PORT || 8070;  /*when we import the web application to server we need to give a port number of a server 
to open our application. process.env.Port allow to use available port at the time we import 
web app to server or if we know the available ports on server we can directly give port number*/


app.use(cors()); 

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));
// Middleware to parse JSON bodies
app.use(bodyParser.json());  //json format mean the key value pairs

const URL = process.env.MONGODB_URL; //mongodb url config 

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

app.use(session({
    //secret value must be a string(This value determine how strong our session id is)
    secret: 'some_secret', // Change this to a random secret key
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:URL,
        collectionName: 'sessions'
    }),
}));

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { userName, password } = req.body;
    const Username = 'Salon@admin';
    const Password = 'admin123';
  
    if (userName === Username && password === Password) {
      req.session.user = userName;
      console.log('Session created:', req.session);
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
  
// Route to check session
app.get('/api/admin/check-auth', (req, res) => {
  console.log('Checking session:', req.session); // Add this line
  if (req.session.user) {
    res.status(200).json({ message: 'Authenticated' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Route to handle logout
app.post('/api/admin/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); //clear the session cookie from the client side
      res.status(200).json({ message: 'Logout successful' });
    });
  });


//when data passing to frontend to backend its calling a url (http://localhost:8070/service) then the services.js in routes will be loaded.



//devinda 
app.use("/Client",clientRouter)
app.use("/eventPackages",packageRouter)
app.use("/EManager",EManagerRouter)
app.use("/eCPackage",ECPackageRouter)

//pulasthi
app.use("/finance",incomeRouter);
app.use("/finance",expenseRouter);
app.use("/finance",budgetRouter);
app.use("/finance",empSalaryRouter);
app.use("/finance",inventoryItemRouter);
app.use("/finance",eventPackageRouter);


//chavidu
app.use("/SalonBooking",SalonItemTimeRouter);
app.use("/StudioBooking",studioBookingRouter);
app.use("/StudioAdmin",StudioPackageRouter);
app.use("/StudioAdmin",StudioImageHandling);
app.use("/StudioAdmin",StudioPackageImageView);
app.use("/SalonBooking",salonBookingRouter)

//maleesha
app.use("/services",servicesRouter)
app.use("/imageUpload",imageUploadRouter);
app.use("/quotation",quotationRouter);
app.use("/MailSend",MailRouter);

//nisalka
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",forgotRoutes);
app.use("/api/users",massmailRoutes);

//anoj
app.use("/StudioInventory",studioInventory);

//yasiru
app.use("/SalonEmp",salonRouter);
app.use("/Attendence",EmpAttendence);
app.use("/Attendancecount",Attendancecount);
app.use("/Leave",Leave);
app.use("/EmpMailsend",sendMailRouter)
app.use("/Image",ImageRoute)

//dasun
app.use("/Faqs", faqsRouter);
app.use("/Feedback", feedbacksRouter);
app.use("/CustomerMessages", customerMessageRouter);
app.use("/MessageReplies", messageReplyRouter);
app.use("/Blogs", blogRouter);
app.use("/Comment", commentRouter);
