const express = require('express')
const app = express();
var multer = require('multer');
let Service = require("../../Models/Maleesha/ServiceModel");
let imgSchema = require("../../Models/Maleesha/ImageUploadModel");


//INSERT DATA
app.post("/itemsAdd", async (req,res) => {

    const{ serviceName, subCategoryName, itemName, itemPrice } = req.body;

    //console.log(req.body);

    try {

        const existingItem = await Service.findOne({ itemName: itemName });
    
        if (existingItem) {
          return res.status(400).json({ message: 'Service with the provided service name already exists.' });
        }

         // Determine the prefix for the item ID based on the service name
        let prefix = '';
        switch(serviceName){

            case 'Hair Care' : prefix = 'H';

                switch(subCategoryName){
                    case 'Hair Cut' : prefix += 'K';
                         break;
                    case 'Hair Coloring' : prefix += 'C'; 
                        break;
                    case 'Hair Treatment' : prefix += 'T';
                        break;
                    default: prefix += 'O'
                }
                break;

            case 'Skin Care' : prefix = 'S';

                switch(subCategoryName){
                    case 'Facial | Cleanup' : prefix += 'F';
                        break;
                    default: prefix += 'O';
                }
                break;

            case 'Nail Care' : prefix = 'N';

                switch(subCategoryName){
                    case 'Manicure | Pedicure' : prefix += 'M';
                        break;
                    case 'Nail Lacqer | Extentions' : prefix += 'N';
                        break;
                    default: prefix += 'O';
                }
                break;

            case 'Bridal' : prefix = 'B';
                
                switch(subCategoryName){
                    case 'Bride Dressing' : prefix += 'B';
                        break;
                    case 'Groom Dressing' : prefix += 'G';
                        break;
                    default: prefix += 'O';
                }
                break;

            default: prefix = '';
            
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

        res.json({ message: 'Service added successfully.'});

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

////////////////////////////////////////////////////////////////////////////////////////////////
//image upload
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    },
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {

    imgSchema.find({})
    .then((data) => {
        res.render('imagepage', { items: data });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});

app.post('/imageUpload', upload.single('image'), (req, res) => {

    var obj = {
        imgId: req.body.imageId,
        name: req.body.name,
        image: {
            data: fs.readFileSync(path.join(__dirname, '/uploads/', req.file.filename)),
            contentType: 'image/png'
        }
    };
    imgSchema.create(obj)
    .then((item) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});

module.exports = app;       
