
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating the schema 
const ecPackageSchema = new Schema({
    
    cpFeature:{
        type :String,
        required : true

    },
   
    cpFeaturePrice : {
        type : Number,
        required :true       

    }
   
})

//creating the connection with the table and the schema 
//eventClientForm is the database name that will be created in db
const ecPackage = mongoose.model("eventCustomPackage",ecPackageSchema);
//export the module 
module.exports = ecPackage;