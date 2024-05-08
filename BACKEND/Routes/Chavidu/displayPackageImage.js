const express = require('express');
const router = express.Router();
const StudioPackageImage = require('../../Models/Chavidu/studioPackageImage');

// Route to display all images of a package
router.get('/package/:packageName/images', async (req, res) => {
    const { packageName } = req.params;

    try {
        // Find the package by its name
        const package = await StudioPackageImage.findOne({ packageName });

        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }

        // Extract images from the package and send as a response
        res.json({ images: package.images });
    } catch (err) {
        console.error('Error fetching images:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
