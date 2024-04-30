const express = require('express');
const router = express.Router();
const Service = require('../../Models/Maleesha/ServiceModel');

// Route to get all item names and prices
router.get('/items', async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await Service.find({}, 'itemName itemPrice serviceTime');

    // Send the items with names and prices to the client
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/serviceTime', async (req, res) => {
  const { itemName } = req.query;

  try {
      const service = await Service.findOne({ itemName });
      if (service) {
          res.json({ serviceTime: service.serviceTime });
      } else {
          res.status(404).json({ message: 'Service not found for the given itemName' });
      }
  } catch (error) {
      console.error('Error fetching service details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
