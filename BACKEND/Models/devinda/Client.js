
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the schema 
const clientSchema = new Schema({
    name: {
        type : String,
        required : true //now to add to the data base there shud be a value for this attribute  
    },
    email :{
         type : String,
         required : true

    },
    phone: {
        type : String,
        required : true
    }, 
    venue : {
        type : String,
        required : true
    }, 
    time :{
        type : String,
        required : true

    },
    date : {
        type : String,
        required :true       

    }
    
    
})

//creating the connection with the table and the schema 
//eventClientForm is the database name that will be created in db
const Client = mongoose.model("eventClientForm",clientSchema);
//export the module 
module.exports = Client;
