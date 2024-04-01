const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
let imgSchema = require("../../Models/Maleesha/ImageUploadModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../../frontend/src/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null,uniqueSuffix + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

//image upload
app.post('/upload', upload.single("image"), async(req, res) => {
    console.log(req.body);

    const imageName = req.file.filename;

    try{
        await imgSchema.create({image:imageName})
        res.json({status:"Success"})
    }catch(error){
        res.json({status:error});
    }

});

//fetch image
app.get("/fetch",async(req,res) => {
    try{

        imgSchema.find({}).then((data) => {
            res.send({status:"Success", data:data});
        });

    }catch(error){
        res.json({status:error});
    }
})

module.exports = app;       
