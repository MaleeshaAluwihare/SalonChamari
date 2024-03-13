var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({

    imageId: {
        type: String,
        required: true
    },

    name :{
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String,
    }
});

const imgSchema = mongoose.model('Image',imageSchema);
module.exports = imgSchema;