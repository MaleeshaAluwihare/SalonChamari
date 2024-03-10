const express = require('express');
const app = express.Router();
let Service = require("../Models/Maleesha/ServiceModel");

// Route to handle search requests
app.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    console.log(req.query);

    // Tokenize the query by removing special characters and splitting by whitespace
    const keywords = query.replace(/[^\w\s]/g, '').split(/\s+/);

    const conditions = keywords.map(keyword => ({
      $or: [
        { serviceName: { $regex: keyword, $options: 'i' } },
        { subCategoryName: { $regex: keyword, $options: 'i' } },
        { itemName: { $regex: keyword, $options: 'i' } }
      ]
    }));

    const services = await Service.find({ $or: conditions });

    if (services.length === 0) {
        return res.status(404).json({ message: 'No services found' });
      }

    res.json(services);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
