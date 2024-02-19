 const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// model
const inventorySchema = new Schema({
    pid: {
       type: Number,
       required: true
   },
     name: {
      type: String,
      required: true
    },
    price: {
       type: Number,
       required: true
    },
    quantity: {
      type: Number,
      required: true
     },
    date: {
      type: String,
      required: true
     },

 })

 const Studio = mongoose.model("Studio", inventorySchema);

 module.exports = Studio;