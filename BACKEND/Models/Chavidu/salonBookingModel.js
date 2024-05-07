const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the salon booking model
const sbookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salonId: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create a model named "SalonBooking" using the sbookingSchema
const SalonBooking = mongoose.model("Salon_Booking", sbookingSchema);

// Export the SalonBooking model to be used elsewhere in the application
module.exports = SalonBooking;
