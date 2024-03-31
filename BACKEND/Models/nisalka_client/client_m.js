const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({

  Email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email addresses
  },
  Full_name: {
    type: String,
    required: true,

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

const ClientAcc = mongoose.model('ClientAcc', accountSchema);

module.exports = ClientAcc;
