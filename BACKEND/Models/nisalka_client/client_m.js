const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  Client_ID: {
    type: String,
    required: false,
  },
  Full_name: {
    type: String,
    required: true,

  },
  Email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email addresses
    lowercase: true // Ensures email is always lowercase for case-insensitive matching
  },
  Password: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model('Client', accountSchema);

module.exports = Client;
