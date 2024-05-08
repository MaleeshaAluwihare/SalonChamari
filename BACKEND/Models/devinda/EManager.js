const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the schema 
const EManagerSchema = new Schema({
    name: {
        type : String,
        required : true //now to add to the data base there shud be a value for this attribute  
    },
    email:{
         type : String,
         required : true

    },
    phone: {
        type : String,
        required : true
    }, 
     
  
    managerID : {
        type : String,
        required :true       

    },
    bookings : {
        type : String,
              

    }


    
    
})

//creating the connection with the table and the schema 
//eventClientForm is the database name that will be created in db
const EManager = mongoose.model("eventManager",EManagerSchema);
//export the module 
module.exports = EManager;
