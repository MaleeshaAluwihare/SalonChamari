const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    pid: {
        type:Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    useQuantity: {
        type: Number
    },
    date: {
        type: Date, 
        default: Date.now 
    }
});

const Studio = mongoose.model("Studio", inventorySchema);

module.exports = Studio;
