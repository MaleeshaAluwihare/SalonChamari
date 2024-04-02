const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqSchema = new Schema({

    faqId : {
        type : String,
        required : true,
        unique : true
    },

    question : {
        type : String,
        required : true
    },

    answer : {
        type : String,
        required : true
    }

})

const Faq = mongoose.model('faq', faqSchema)

module.exports = Faq;