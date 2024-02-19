const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;  // Destructuring Schema class from mongoose

// Define the schema for the salon booking model
const pbookingSchema = new Schema({
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
    package: {
        type: String,   
        required: true  
    },
    amount: {
        type: String,   
        required: true 
    },
    photographer: {
        type: String,   
        required: true 
    }  
    }, { timestamps: true }); 

// Create a model named "StudioBooking" using the pbookingSchema
const StudioBooking = mongoose.model("Studio_Booking", pbookingSchema);
//Studio_Booking will become plural

// Export the Studio_Booking model to be used elsewhere in the application
module.exports = StudioBooking;
