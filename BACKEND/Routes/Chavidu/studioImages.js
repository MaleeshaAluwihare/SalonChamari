const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
const StudioPackageImage = require("../../Models/Chavidu/studioPackageImage");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../frontend/src/uploads/chavidu'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Image upload
app.post('/upload', upload.single("image"), async (req, res) => {
    const { packageName } = req.body;
    const imageName = req.file.filename;

    try {
        await StudioPackageImage.create({ packageName, images: imageName });
        res.json({ status: "Success" });
    } catch (error) {
        res.json({ status: error });
    }
});

// Fetch images
app.get("/fetch", async (req, res) => {
    try {
        const images = await StudioPackageImage.find({});
        res.json({ status: "Success", data: images });
    } catch (error) {
        res.json({ status: error });
    }
});

module.exports = app;
