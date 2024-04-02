var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(

    {
        image:String
    },
);

const imgSchema = mongoose.model('ImageDetails',imageSchema);
module.exports = imgSchema;