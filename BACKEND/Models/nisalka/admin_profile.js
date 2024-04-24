const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

  Email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email addresses
  },
  Password: {
    type: String,
    required: true,
  }

});

const AProfile = mongoose.model('AProfile', adminSchema);

module.exports = AProfile;