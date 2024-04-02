//the data passing from the routes to DB passing through this model

//import mongoose for connect to DB and assign it to mongoose variable
const mongoose = require('mongoose');

// creating the schema
const Schema = mongoose.Schema; 

//just like creating a object from Schema (table)
const serviceSchema = new Schema({

  serviceName: { 
    type: String, 
    required: true 
  },
  subCategoryName: {
     type: String,
     required: true 
  },
  itemID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  itemName: { 
    type: String, 
    required: true 
  },
  itemPrice: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0
  },
  serviceTime: {
    type:Number,
    required: true,
    default:0,
    min:0,
  }
  
});

//the first para is document(table) name and the second para is Schema
const Service = mongoose.model('Service', serviceSchema);

//if we dont export the Schema we cant access Schema from routes
module.exports = Service;
