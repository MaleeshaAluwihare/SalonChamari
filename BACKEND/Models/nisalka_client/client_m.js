const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaccountSchema = new mongoose.Schema({
  
  Client_ID:{
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 15,
  },
    Full_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  Email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  Phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
  Age: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 3,
  },
  Gender: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255,
  },

});

const Clientaccount = mongoose.model('clientaccount', CaccountSchema);

module.exports = Clientaccount;