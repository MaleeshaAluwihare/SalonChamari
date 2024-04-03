const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqSchema = new schema({

    Question: {
        type: String,
        required: true
    },

    Answer: {
        type: String,
        required: true
    },

});

const Faqs = mongoose.model('faqDB', faqSchema);

module.exports = Faqs;