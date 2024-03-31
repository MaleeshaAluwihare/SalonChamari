const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  Client_ID: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
    trim: true // Ensures leading/trailing whitespace is removed
  },
  Full_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email addresses
    minlength: 5,
    maxlength: 100,
    trim: true,
    lowercase: true // Ensures email is always lowercase for case-insensitive matching
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
    minlength: 10, // Assuming phone number format (adjust based on your needs)
    maxlength: 15,
    trim: true
  },
  Age: {
    type: Number,
    required: true,
    min: 18, // Adjust minimum age if necessary
    max: 120, // Adjust maximum age if necessary
  },
  Gender: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
});

const Client = mongoose.model('Client', accountSchema);

module.exports = Client;
