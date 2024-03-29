const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;  // Destructuring Schema class from mongoose

// Define the schema for the salon booking model
const salServiceTime = new Schema({
    service: {
        type: String,  
        required: true  
    },
    time: {
        type: String,   
        required: true  
    }
    }, { timestamps: true }); 

// Create a model named "SalonBooking" using the studentSchema
const salonServiceTime = mongoose.model("Salon_ServiceTime", salServiceTime);
//Salon_Booking will become plural

// Export the Salon_Booking model to be used elsewhere in the application
module.exports = salonServiceTime;
