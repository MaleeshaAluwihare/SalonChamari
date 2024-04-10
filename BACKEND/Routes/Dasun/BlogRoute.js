const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const Blogs = require("../../Models/Dasun/BlogModel");



const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, path.join(__dirname, '../../../frontend/src/uploads'));

    },

    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);

    }

});



const upload = multer({storage: storage});




//ADD BLOG
app.post('/add', upload.single("image")), async (req, res) => {

    const {blogId, topic, content} = req.body;
    const image = req.file.filename;

    try {

        await Blogs.create({blogId, topic, content, image: image});
        res.json({status: "Success"});

    }catch(error){

        res.json({status: error});

    }

}



