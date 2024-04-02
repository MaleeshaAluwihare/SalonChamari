const express = require('express');
const app = express();
const Service = require('../../Models/Maleesha/ServiceModel');

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

module.exports = app;





