const express = require('express')
const app = express();
const Chart = require('chart.js');
let Service = require("../../Models/Maleesha/ServiceModel");
let SalonBooking = require("../../Models/Chavidu/salonBookingModel");

app.post("/itemsAdd", async (req, res) => {

    const { serviceName, subCategoryName, itemName, itemPrice } = req.body;

    try {
        // Check if an item with the same name already exists
        const existingItem = await Service.findOne({ itemName: itemName });

        if (existingItem) {
            return res.status(400).json({ message: 'Service with the provided item name already exists.' });
        }

        // Determine the prefix for the item ID based on the service name
        let prefix = '';
        switch (serviceName) {

            case 'Hair Care':
                prefix = 'H';

                switch (subCategoryName) {
                    case 'Haircut':
                        prefix += 'K';
                        break;
                    case 'Hair Color':
                        prefix += 'C';
                        break;
                    case 'Hair Treatment':
                        prefix += 'T';
                        break;
                    default:
                        prefix += 'HN'
                }
                break;

            case 'Skin Care':
                prefix = 'S';

                switch (subCategoryName) {
                    case 'Facial | Cleanup':
                        prefix += 'F';
                        break;
                    default:
                        prefix += 'SN';
                }
                break;

            case 'Nail Care':
                prefix = 'N';

                switch (subCategoryName) {
                    case 'Manicure | Pedicure':
                        prefix += 'M';
                        break;
                    case 'Nail Lacqer | Extentions':
                        prefix += 'N';
                        break;
                    default:
                        prefix += 'NN';
                }
                break;

            case 'Bridal':
                prefix = 'B';

                switch (subCategoryName) {
                    case 'Bride Dressing':
                        prefix += 'B';
                        break;
                    case 'Groom Dressing':
                        prefix += 'G';
                        break;
                    case 'Packages':
                        prefix += 'P';
                        break;
                    default:
                        prefix += 'BN';
                }
                break;

            default:
                prefix = '';

        }

        const itemCount = await Service.countDocuments({ serviceName, subCategoryName })

        const itemID = prefix + padNumber(itemCount + 1, 2);

        // Create a new service object
        const newService = new Service({
            serviceName,
            subCategoryName,
            itemID,
            itemName,
            itemPrice,
        });

        await newService.save();

        res.json({ message: 'Service added successfully.' });

    } catch (error) {
        console.error('Error adding service:', error);
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return res.status(400).json({ message: 'Duplicate itemID detected.' });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }
});

function padNumber(number, width) {
    return String(number).padStart(width, '0');
}


////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAY DATA
//Retrives the Service by serviceID
app.get("/itemsGet/:itemID", async(req,res) => {
    const { itemID } = req.params;

    try {
        // Find items based on itemID prefix
        const items = await Service.find({ itemID: { $regex: `^${itemID}` } });

        if (items.length === 0) {
            return res.status(404).json({ message: `No items found for ${itemID}` });
        }
        
        res.json({ service: items[0] });
        
    } catch (error) {
        console.error('Error Fetching Items', error);
        res.status(500).json({ message: `Server Error` });
    }
});


//------------------------display hair cuts------------------------//
app.get("/hairCut", async (req, res) => {
    try {
        // Retrieve services with item IDs starting with 'HK'
        const hairServices = await Service.find({ itemID: /^HK/ }); // Using a regular expression to match the prefix

        if(hairServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(hairServices);

    } catch (error) {
        console.error('Error retrieving hair services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display hair color------------------------//
app.get("/hairColor", async (req, res) => {
    try {
        const hairServices = await Service.find({ itemID: /^HC/ });

        if(hairServices.length === 0){
            return res.status(200).json( [ ] );
        }
        res.json(hairServices);

    } catch (error) {
        console.error('Error retrieving hair services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display hair treatments------------------------//
app.get("/hairTreatment", async (req, res) => {
    try {
        const hairServices = await Service.find({ itemID: /^HT/ });

        if(hairServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(hairServices);

    } catch (error) {
        console.error('Error retrieving hair services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


//------------------------display Skin treatments------------------------//
app.get("/skinTreatment", async (req, res) => {
    try {
        const skinServices = await Service.find({ itemID: /^SF/ });

        if(skinServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(skinServices);

    } catch (error) {
        console.error('Error retrieving skin services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display Nail manicure------------------------//
app.get("/nailManicure", async (req, res) => {
    try {
        const nailServices = await Service.find({ itemID: /^NM/ });

        if(nailServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(nailServices);

    } catch (error) {
        console.error('Error retrieving nail services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display Nail lacqer------------------------//
app.get("/nailLacqer", async (req, res) => {
    try {
        const nailServices = await Service.find({ itemID: /^NN/ });

        if(nailServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(nailServices);

    } catch (error) {
        console.error('Error retrieving nail services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display bridal bride------------------------//
app.get("/bridalBride", async (req, res) => {
    try {
        const brideServices = await Service.find({ itemID: /^BB/ });

        if(brideServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(brideServices);

    } catch (error) {
        console.error('Error retrieving bridal services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display bridal groom------------------------//
app.get("/bridalGroom", async (req, res) => {
    try {
        const groomServices = await Service.find({ itemID: /^BG/ });

        if(groomServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(groomServices);

    } catch (error) {
        console.error('Error retrieving bridal services:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//------------------------display package---------------------------//
app.get("/Packages", async (req, res) => {
    try {
        const groomServices = await Service.find({ itemID: /^BP/ });

        if(groomServices.length === 0){
            return res.status(200).json([ ]);
        }
        res.json(groomServices);

    } catch (error) {
        console.error('Error retrieving packages:', error);
        res.status(500).json({ message: 'Internal server error.' });
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
            itemPrice,
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


// get popular services based on bookings
app.get("/popular-services", async (req, res) => {
    try {
        const popularServices = await SalonBooking.aggregate([
            { $group: { _id: "$service", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Get the top 5 most booked services or less if there are fewer unique services
        const topServices = popularServices.slice(0, 5);

        res.json(topServices);
        
    } catch (err) {
        console.error("Error with get popular services:", err.message);
        res.status(500).send({ status: "Error with get popular services", error: err.message });
    }
});

//pie chart
app.get("/pie-chart-data", async (req, res) => {
    try {
        // Aggregate the data to get the count of items under each service name
        const serviceData = await Service.aggregate([
            {
                $group: {
                    _id: "$serviceName",
                    itemCount: { $sum: 1 }
                }
            }
        ]);

        // Calculate the total number of items
        const totalItems = await Service.countDocuments();

        // Calculate the percentage of items for each service name
        const serviceDataWithPercentage = serviceData.map(service => ({
            serviceName: service._id,
            itemCount: service.itemCount,
            percentage: ((service.itemCount / totalItems) * 100).toFixed(2)
        }));

        // Send data to the client
        res.json(serviceDataWithPercentage);
        
    } catch (error) {
        console.error("Error fetching service data for pie chart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = app;       
