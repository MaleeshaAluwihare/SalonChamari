const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for studio packages
const studioPackageSchema = new Schema({
    package: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String, // Assuming package descriptions are text
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 
    },
    photographer: {
        type: String,
        required: true
    }
});

const StudioPackage = mongoose.model('StudioPackage', studioPackageSchema);

module.exports = StudioPackage;
