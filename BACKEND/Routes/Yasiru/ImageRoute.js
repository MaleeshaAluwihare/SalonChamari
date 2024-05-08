const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imgSchema = require("../../Models/Yasiru/saloon");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../frontend/src/profileImage'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Image upload
router.route('/upload', upload.single("Image")).post( async (req, res) => {
  
  const { Employee_ID, Name, Address,category,jobROle,Salary,Password,email } = req.body;
  const imageName = req.file.filename;

  try {
    await imgSchema.create({  Employee_ID, Name, Address,category,jobROle,Salary,Password,email,Image:imageName});
    res.json({ status: "Success" });
  } catch (error) {
    res.json({ status: error });
  }
});

// Retrieve images from database`
router.route("/fetch").get(async (req, res) => {
  try {
    const images = await imgSchema.find({});
    res.json({ status: "Success", data: images });
  } catch (error) {
    res.json({ status: error });
  }
});

module.exports = router;