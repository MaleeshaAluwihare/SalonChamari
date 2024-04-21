const express = require("express");
const router = express.Router();
const Studio = require("../../Models/Anoj/studioM");
const InventoryItemTable = require("../../Models/pulasthi-models/InventoryItem");


//Reorder Inventory
router.route("/reorder").post((req,res) => {

    const{ itemId, quantity, date, itemType } = req.body;

    const newItem = new InventoryItemTable({
        itemId,
        quantity,
        date,
        itemType
    });

    newItem.save().then(() => {
        res.json("Item Added");
    }).catch((err) => {
        res.status(500).json({error:"Failed to add item"});
    });
 
});


router.post("/add", (req, res) => {
    const { pid, name, price, quantity } = req.body;

    // Creating a new instance of the Studio model with the data from the request body
    const newStudio = new Studio({
        pid,
        name,
        price,
        quantity,
        date: new Date() // Adding current date when inserting data
    });

    // Saving the newStudio instance to the database
    newStudio
        .save()
        .then(() => {
            res.json("Studio Added"); // Sending a JSON response indicating success
        })
        .catch((err) => {
            console.error('Error message:',err);
            res.status(500).json({ error: "Failed to add Studio" }); // Sending an error response if saving fails
        });
});


// DISPLAY DATA
router.get("/display", (req, res) => {
    Studio.find()
        .then((studios) => {
            res.json(studios);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch Studios" });
        });
});

// UPDATE BY ID
router.put("/update/:pid", async (req, res) => {
    const pid = req.params.pid;
    const { name, price, quantity, useQuantity } = req.body;

    try {
        const updateProduct = {
            name,
            price,
            quantity,
            useQuantity,
            updateDate: new Date() // Update the updateDate field
        };

        const filter = { pid: pid };

        const updateStudio = await Studio.findOneAndUpdate(filter, updateProduct, {
            new: true
        });

        if (!updateStudio) {
            return res.status(404).json({ message: `Product with productId ${pid} not found` });
        }

        res.json({ message: `Product updated successfully` });
    } catch (error) {
        console.error(`Error updating product:`, error);
        res.status(500).json({ message: error.message });
    }
});

// Get Product by ID
router.get("/searchById", async (req, res) => {
    const pid = req.query.pid; // Use query parameter instead of route parameter

    try {
        const product = await Studio.findOne({ pid: pid });

        if (!product) {
            return res.status(404).json({ status: "Product not found" });
        }

        res.status(200).json({ status: "Product fetched", product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// Get Product by Name
router.get("/searchByName", async (req, res) => {
    const name = req.query.name;

    try {
        const product = await Studio.findOne({ name: name });

        if (!product) {
            return res.status(404).json({ status: "Product not found" });
        }

        res.status(200).json({ status: "Product fetched", product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
});

// DELETE BY ID
router.delete("/delete/:pid", async(req, res) => {
    const { pid } = req.params;

    try{
        const deleteProduct = await Studio.findOneAndDelete({ pid: pid });

        if(!deleteProduct){
            return res.status(404).json({ message: `Item with ID ${pid} not found`});
        }

        res.json({ message: 'Item deleted successfully',deleteProduct});
    }catch(error){
        console.error('Error Deleting Product', error);
        res.status(500).json({ message: `Server Error`});
    }
});



module.exports = router;
