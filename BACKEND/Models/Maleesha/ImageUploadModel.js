var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({

    Category: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },
     
    itemPrice: {
        type:Number,
        required: true
    },

    image: {
        type: String
    }
});

const imgSchema = mongoose.model('ImageDetails', imageSchema);
module.exports = imgSchema;
