const mongoose = require('mongoose');  
const Schema = mongoose.Schema;  

const pbookingSchema = new Schema({
    name: {
        type: String,  
        required: true  
    },
    email: {
        type: String,   
        required: true  
    },
    contactNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,   
        //required: true  
    },
    sid: {
        unique: true,
        type: String,  
        required: true  
    },
    StudioPackage: {
        type: String,   
        required: true , 
        unique: true
    },
    amount: {
        type: String,   
        required: true 
    },
    photographer: {
        type: String,   
        required: true 
    }//custom booking added    
    // custom :{
    //     type: String,
        
    // }  
    //add the "add comment section"
}, { timestamps: true }); 

const StudioBooking = mongoose.model("Studio_Booking", pbookingSchema);

module.exports = StudioBooking;
