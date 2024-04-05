const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
const imgSchema = require("../../Models/Maleesha/ImageUploadModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../../frontend/src/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    }
});

  
const upload = multer({ storage: storage });

// Image upload
app.post('/upload', upload.single("image"), async (req, res) => {

    const { category, itemName, itemPrice } = req.body;
    const imageName = req.file.filename;

    try {
        await imgSchema.create({ category, itemName, itemPrice, image: imageName });
        res.json({ status: "Success" });
    } catch (error) {
        res.json({ status: error });
    }
});

// Fetch images
app.get("/fetch", async (req, res) => {
    try {
        const images = await imgSchema.find({});
        res.json({ status: "Success", data: images });
    } catch (error) {
        res.json({ status: error });
    }
});

module.exports = app;
