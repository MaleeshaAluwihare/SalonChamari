const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    itemId: {
        type: String,  
        required: true,
        unique:true,
        trim: true
    },
    quantity: {
        type: Number,   
        required: true,
        trim: true  
    },
    date: {
        type: Date,   
        required: true  
    },
    itemType: {
        type: String,  
        required: true,
        trim: true
    },
    itemPrice: {
        type:Number
    }
},{timestamps:true})

const InventoryItemTable = mongoose.model("InventoryItem", InventoryItemSchema);

module.exports = InventoryItemTable;

