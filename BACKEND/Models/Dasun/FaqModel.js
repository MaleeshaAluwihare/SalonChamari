const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({

    question : {
        type : String,
        require : true
    },

    answer : {
        type : String,
        require : true
    }

})

const Faq = mongoose.model('faq', faqSchema)

module.exports = Faq;