const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const path = require('path'); // Destination folder for uploaded files
const Service = require('../../Models/Maleesha/ServiceModel');
const Appointment = require('../../Models/Maleesha/QuatationModel');

// Fetch all services
app.get('/allServices', async( req, res ) => {
    try{
        const services = await Service.find().distinct('serviceName');
        res.json(services);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Fetch subcategories for a given service
app.get('/subcategories/:serviceName', async (req,res) => {
    try{
        const subcategories = await Service.find({
            serviceName: req.params.serviceName,
        }).distinct('subCategoryName');
        res.json(subcategories);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

// Fetch service items for a given subcategory
app.get('/serviceitems/:subCategoryName',async (req,res) => {
    try{
        const serviceItems = await Service.find({
            subCategoryName: req.params.subCategoryName,
        });
        res.json(serviceItems);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//store the pdf file inside frontend folder and pass the filename to backend to store in DB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../../../frontend/src/QuotationPDF');
        fs.mkdir(destinationPath, { recursive: true }, (err) => {
            if (err) return cb(err);
            cb(null, destinationPath);
        });
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    }
})

const upload = multer({ storage: storage })

//create an appoinment
app.post("/newAppointment", upload.single('pdf'), async (req, res) => {

    // Get the highest existing appointmentID
    const highestAppointment = await Appointment.findOne({}, {}, { sort: { 'appointmentID': -1 } });

    // Determine the next appointmentID
    let nextAppointmentID = 1;
    if (highestAppointment) {
        nextAppointmentID = parseInt(highestAppointment.appointmentID.substr(3)) + 1;
    }

    // Create a new Appointment document
    const { customerName, contactNumber, appointmentDate, appointmentTime } = req.body;
    const pdf = req.file.filename;

    try {
        await Appointment.create({
                                    appointmentID: 'APP' + nextAppointmentID.toString().padStart(4, '0'),
                                    customerName,
                                    contactNumber, 
                                    quotation: pdf, 
                                    appointmentDate, 
                                    appointmentTime
                                });

        res.status(200).json({status: "Appointment saved successfully"});
        
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({status: "Error creating appointment"});
    }
    
});


module.exports = app;







