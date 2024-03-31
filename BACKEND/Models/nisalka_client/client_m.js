const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaccountSchema = new mongoose.Schema({
  
  Client_ID:{
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
  },
    Full_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  Email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50,
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
    minlength: 3,
    maxlength: 20,
  },

});

const Clientacc = mongoose.model('client_account', CaccountSchema);

module.exports = Clientacc;