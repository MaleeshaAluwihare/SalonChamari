const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the schema 
const ePackageSchema = new Schema({
    pName: {
        type : String,
        required : true, //now to add to the data base there shud be a value for this attribute  
        unique : true 
    },

    pFeatures:{
        type :Array,
        required : true

    },
   
    pPrice : {
        type : String,
        required :true       

    },
    pDiscription : {
        type : Array
        
    }
   
})

//creating the connection with the table and the schema 
//eventClientForm is the database name that will be created in db
const Package = mongoose.model("eventPackage",ePackageSchema);
//export the module 
module.exports = Package;