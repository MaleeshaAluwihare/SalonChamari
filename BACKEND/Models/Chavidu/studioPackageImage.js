const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudioPackage = new Schema({
    packageName: {
        type: String,
        required: true,
        unique: true 
    },
    images: [{
        type: String 
    }],
    description: {
        type: String
    }
});

const StudioPackageImage = mongoose.model('StudioPackageImage', StudioPackage);

module.exports = StudioPackageImage;
