const router = require("express").Router();
let Service = require("../Models/Maleesha/Service");

//INSERT DATA
 //"add" will be end url when calling from the frontend
router.post("/itemsAdd", async (req,res) => {
    console.log("fnvjdnvki");

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
    
        res.json({ message: 'Service added successfully.', savedService });

      } catch (error) {
        
        console.error('Error adding service:', error);
        if (error.code === 11000) { 
          // MongoDB duplicate key error
          return res.status(400).json({ message: error });
        }
        res.status(500).json({ message: 'Server error' });
      }
});

////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAY DATA
//Retrives the items by service and subCategory name
router.route("/itemsGet/:serviceName/:subcategoryName").get(async(req,res) => {

    const { serviceName, subCategoryName } = req.params;

    try{
        //find the items based on the service name and subCategory
        const items = await Service.find({
            serviceName: serviceName,
            subCategoryName: subCategoryName
        }, 'itemID itemName price');

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
router.route("/itemsDelete/:itemID").delete(async(req,res) =>{

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
router.route("itemsUpdate/:itemID").put(async(req,res) => {

    //getting the inserted data from req body
    const { itemID } = req.params;
    const { newName, newPrice } = req.body;

    try{
        // Find the item by itemId and update its itemName and itemPrice
        const updateItem = await Service.findOneAndUpdate(
            { itemID: itemID },
            { $set: {itemName: newName, itemPrice: newPrice }},
            {new: true } 
        );

        if(!updateItem){
            return res.status(404).json({ message: `Item with ID ${itemID} not found`});
        }

        res.json({message: 'Item updated successfully',updateItem});

    }catch(error){
        console.error('Error Updating Item', error);
        res.status(500).json({ message: `Server Error`});
    }
       
});


module.exports = router;       
