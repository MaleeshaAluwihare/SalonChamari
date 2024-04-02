const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

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
  Title:{
    type:String,
    required:true,
  }

});

const AdminProfile = mongoose.model('AdminProfile', adminSchema);

module.exports = AdminProfile;