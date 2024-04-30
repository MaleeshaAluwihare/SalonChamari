const express = require('express');
const router = express.Router();
const multer = require('multer');
const app = express.Router();

const StudioPackage = require('../../Models/Chavidu/studioPackage');

// Route to add a new studio package
router.post('/addPackage', async (req, res) => {
    try {
        const { package, description, amount, photographer } = req.body;

        // Create a new studio package document
        const newPackage = new StudioPackage({ package, description, amount, photographer });

        // Save the new studio package document to the database
        await newPackage.save();

        res.status(201).json({ message: 'Studio package added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to delete a studio package by ID
router.delete('/packages/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the package by ID and delete it
        await StudioPackage.findByIdAndDelete(id);

        res.json({ message: 'Studio package deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/packages/:packageName', async (req, res) => {
    try {
        const { packageName } = req.params;
        const { description, amount, photographer } = req.body;

        // Find the package by name and update its fields
        await StudioPackage.findOneAndUpdate({ package: packageName }, { description, amount, photographer });

        res.json({ message: 'Studio package updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to display all studio packages
router.get('/packages', async (req, res) => {
    try {
        // Find all packages
        const packages = await StudioPackage.find();

        res.json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to fetch all package names and their details
router.get('/packageNames', async (req, res) => {
    try {
        // Find all package names
        const packageNames = await StudioPackage.find({}, 'package description');

        res.json(packageNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
