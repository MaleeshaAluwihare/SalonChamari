const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const EventPackageSchema = new Schema({
    packageId: {
        type: String,  
        required: true,
        unique:true,
        trim: true
    },
    packageType: {
        type: String,   
        required: true,
        trim: true  
    },
    date: {
        type: Date,   
        required: true  
    },
    profit: {
        type: Number,  
        trim: true
    },
    cost: {
        type: Number,
        trim:true
    }
},{timestamps:true})

const EventPackageTable = mongoose.model("EventPackage", EventPackageSchema);

module.exports = EventPackageTable;