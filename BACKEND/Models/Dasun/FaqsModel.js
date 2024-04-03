const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqSchema = new schema({

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    },

});

const Faqs = mongoose.model('faqDB', faqSchema);

module.exports = Faqs;