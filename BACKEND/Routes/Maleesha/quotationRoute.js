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
    destination:function (req,file,cd){
        createBrotliCompress(null,path.join(__dirname, '../../../frontend/src/frontend/src/QuotationPDF'));
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    }
})

const upload = multer({storage:storage});

//create an appoinment
app.post("/newAppointment", upload.single('pdf'), async (req, res) => {
    try {
        const { appointmentID, customerName, contactNumber, appointmentDate, appointmentTime } = req.body;
        
        const pdfName = req.file.filename;

        // Create a new Appointment document
        const newAppointment = new Appointment({
            appointmentID: appointmentID,
            customerName: customerName,
            contactNumber: contactNumber,
            quotation: pdfName,
            currentDate: new Date(),
            appointmentDate: new Date(appointmentDate),
            appointmentTime: appointmentTime
        });

        // Save the document to MongoDB
        const savedAppointment = await newAppointment.save();
        console.log('Appointment saved successfully:', savedAppointment);
        res.status(200).json(savedAppointment);
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).json({ error: 'Error saving appointment' });
    }
});

module.exports = app;







