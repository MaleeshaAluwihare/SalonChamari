const express = require('express')
const app = express();
let Service = require("../Models/Maleesha/ServiceModel");

//INSERT DATA
 //"add" will be end url when calling from the frontend
app.post("/itemsAdd", async (req,res) => {

    //getting the inserted data from req body //destructure way
    const{ serviceName, subCategoryName, itemID, itemName, itemPrice } = req.body;

    console.log(req.body);

    try {
        // Check if itemID already exists
        const existingItem = await Service.findOne({ itemID: itemID });
    
        if (existingItem) {
          return res.status(400).json({ message: 'Item with the provided itemID already exists.' });
        }
    
        // Create a new service object
        const newService = new Service({
          serviceName,
          subCategoryName,
          itemID,
          itemName,
          itemPrice,
        });
    
        // Save the new service object to the database
        const savedService = Service.create(newService)
    
        res.json({ message: 'Service added successfully.'});
        console.log(newService);

    } catch (error) {
        console.error('Error adding service:', error);
        if (error.code === 11000) { 
          // MongoDB duplicate key error
          return res.status(400).json({ message: 'Duplicate itemID detected.' });
        }
        res.status(500).json({ message: 'Internal server error.' });
      }
 
});

////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAY DATA
//Retrives the items by service and subCategory name
app.get("/itemsGet/:serviceName/:subCategoryName", async(req,res) => {

    const { serviceName, subCategoryName } = req.params;

    console.log(req.params);

    try{
        //find the items based on the service name and subCategory
        const items = await Service.find({
            serviceName: serviceName,
            subCategoryName: subCategoryName
        }).select('itemID itemName itemPrice').exec();

        if(items.length === 0){
            return res.status(404).json({ message: `No items found for ${serviceName} and ${subCategoryName}`});
        }
        res.json(items);
    }
    catch(error) {
        console.error('Error Fetching Items' , error);
        res.status(500).json({ message: `Server Error`});
    }    
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//DELETE BY ID
app.delete("/itemsDelete/:itemID" , async(req,res) =>{

    const { itemID } = req.params;

    try{
        //find the item by itemID and delete it
        const deleteItem = await Service.findOneAndDelete({ itemID: itemID });

        if(!deleteItem){
            return res.status(404).json({ message: `Item with ID ${itemID} not found`});
        }

        res.json({ message: 'Item deleted successfully',deleteItem});
    }catch(error){
        console.error('Error Deleting Item', error);
        res.status(500).json({ message: `Server Error`});
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//UPDATE BY ID
app.put("/itemsUpdate/:itemID", async(req,res) => {

    let itemID = req.params.itemID;
    const { serviceName,subCategoryName,itemName,itemPrice } = req.body;

    try{

        const updateService = {
            serviceName,
            subCategoryName,
            itemName,
            itemPrice
        }

        const filter = { itemID: itemID };

        const updatedService = await Service.findOneAndUpdate(filter,updateService,{
            new : true
        });

        //console.log(updatedService);

        if(!updatedService){
            return res.status(404).json({message:`Service with itemID ${itemID} not found`});
        }

        await updatedService.save();
        
        res.json({ message: `Service updated successfully`})

    } catch(error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = app;       
