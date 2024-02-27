// //the data passing from the routes to DB passing through this model

// //import mongoose for connect to DB and assign it to mongoose variable
// const mongoose = require('mongoose');

// // creating the schema
// const Schema = mongoose.Schema; 

// //just like creating a object from Schema (table)
// const serviceSchema = new Schema({

//   serviceName: { type: String, required: true },
//   subcategories: [{
//     subcategoryName: { type: String, required: true },
//     items: [{
//       itemID: { type: String, required: true, unique: true },
//       itemName: { type: String, required: true },
//       price: { type: Number, required: true }
//     }]
//   }]
// });

// //the first para is document(table) name and the second para is Schema
// const Service = mongoose.model('Service', serviceSchema);

// //if we dont export the Schema we cant access Schema from routes
// module.exports = Service;
