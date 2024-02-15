const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//model
const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  subCategories: [
    {
      Subname:{
        type: String,
        required: true
      }, 
      services: [
        {
          name: {
            type: String,
            required: true
          },
          standardPrice:{
            type: Number,
            required:true
          },
        },
      ],
    },
  ],
})

const Services = mongoose.model("Services",serviceSchema);

module.exports = Services;