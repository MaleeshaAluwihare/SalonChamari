const express = require('express')
const app = express();
let Service = require("../Models/Maleesha/ServiceModel");

//INSERT DATA
 //"add" will be end url when calling from the frontend
app.post("/add",async(req,res)=>{

    //getting the inserted data from req body //destructure way
    const{ serviceName, subCategoryName, itemID, itemName, itemPrice } = req.body;

    console.log(req.body);

    try{
        //find service by name
        let service = await Service.findOne({serviceName:serviceName});

        //If the service doesn't exist,create a new Service object with the provided sName and an empty array for subcategories.
        if(!service){
            service = new Service({
                serviceName: serviceName,
                subcategories: []
            });
        }

        // find the subcategory within the service by its name
        let subcategory = service.subcategories.find(sub => sub.subcategoryName === subCategoryName);

        /* if doesn't exist,create a new subcategory object with the provided subcategoryName and an empty array for items, 
        then push it into the subcategories array of the service.*/
        if (!subcategory) {
            subcategory = {
                subcategoryName: subCategoryName,
                items: []
            };
            service.subcategories.push(subcategory);
        }
        console.log("line execute succesfully");

        //add item to subcategory
        subcategory.items.push({itemID:itemID, itemName:itemName,price:itemPrice});

        // Mark the service object as modified
        service.markModified('subcategories');

        //save the new service object to mongoDB through Model
        await service.save();

        //return the updated service
        res.status(201).json(service);
 
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'server Error'})
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAY DATA
//Retrives the items by service and subCategory name
app.get("/items/:Service/:Subcategory",async(req,res) => {

    //getting the inserted data from req body
    const { serviceName, subcategoryName } = req.params;

    try{
        //find the service by name
        const service = await Service.findOne({ serviceName});

        //if service not found return an error message
        if(!service){
            return res.status(404).json({ message: `Service with name ${serviceName} not found`});
        }

        //find the subcategory by name
        const subcategory = service.subcategories.find(sub => sub.subcategoryName === subcategoryName);

        //if subcategory not found return an error message
        if(!subcategory){
            return res.status(404).json({message: `Subcategory with name ${subcategoryName} not found in ${serviceName} service`});
        }

        // Return the items of the found subcategory
        res.json(subcategory.items)

    }catch(error){
        console.error(error);
        res.status(500).json({message:`Server Error`});
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//DELETE BY ID
app.delete("/delete/:Service/:/Subcategory/:itemID", async(req,res) =>{

    //getting the inserted data from req body
    const { serviceName,subcategoryName,itemID } = req.params;

    try{
        //Find the service by name
        const service = await Service.findOne({ serviceName });

        if(!service){
            return res.status(404).json({ message: `Service with name ${serviceName} not found`});
        }

        //Find the subcategory by name within the service
        const subcategory = service.subcategories.find(sub => sub.subcategoryName === subcategoryName);

        if(!subcategory){
            return res.status(404).json({ message: `Subcategory with name ${subcategoryName} not found`});
        }

        //Find the index of the item with the given itemID within the subCategory
        const indexToDelete = subcategory.items.findIndex(item => item.itemID === itemID);

        if(indexToDelete === -1){
            return res.status(404).json({ message: `Item with itemID ${itemID} not found`});
        }

        //Remove the item from the subcategory
        subcategory.items.splice(indexToDelete,1);

        //Save the changes to the database
        await service.save();

        //Return the success message
        res.json( {message: `Item with ID ${itemID} deleted successfully from ${serviceName}`})
    }catch(error) {
        console.error(error);
        res.status(500).json9({ message: `Server Error`});
    }

});

///////////////////////////////////////////////////////////////////////////////////////////////////

// //UPDATE BY ID
// app.update("update/:itemID", async(req,res) => {

//     //getting the inserted data from req body
//     const { itemID } = req.params;
//     const { newName, newPrice } = req.body;

//     try{
//         //find the srvice that contain the items with the giveb itemID
//         const service = await Service.findOne({ "subcategories.items.itemID": itemID})

//         if(!service){
//             return res.status(404).json({ message: `Item with item ID ${itemID} not found`})
//         }

//         //find the subcatogory and the item within the service
//         let foundItem;
//         let foundSubCatogory;

//         service.subcategories.forEach(subcategory=>{
//             foundItem = subcategory.items.find(item => item.itemID === itemID);
//             if(foundItem){
//                 foundSubCatogory = subcategory;
//             }
//         });

//         if(!foundItem || !foundSubCatogory){
//             return res.status(404).json({message: `Item with ID ${itemID} not found`});
//         }

//         //update the item properties
//         foundItem.itemName = newName;
//         foundItem.price = newPrice;

//         //save the changes to database
//         await service.save();

//         //return the update item
//         res.json(foundItem);
    
//     }catch(error){
//         console.error(error);
//         res.status(500).json({message: `Server error`});
//     }
// });


module.exports = app;       
