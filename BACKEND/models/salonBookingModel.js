const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;  // Destructuring Schema class from mongoose

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
    sid: {
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
    } 
    }, { timestamps: true }); 

// Create a model named "SalonBooking" using the studentSchema
const SalonBooking = mongoose.model("Salon_Booking", sbookingSchema);
//Salon_Booking will become plural

// Export the Salon_Booking model to be used elsewhere in the application
module.exports = SalonBooking;
