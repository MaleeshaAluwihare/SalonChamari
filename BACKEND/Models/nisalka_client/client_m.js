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
    name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 15,
  },
  address: {
    type: String,
    minlength: 10,
    maxlength: 255,
  },

});

const clientaccount = mongoose.model('clientaccount', ClientAccountSchema);

module.exports = clientaccount;