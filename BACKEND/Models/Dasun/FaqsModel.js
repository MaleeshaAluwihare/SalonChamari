const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqSchema = new schema({

    faqId: {
        type: String,
        required: true,
        unique: true
    },

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    },

});

const Faqs = mongoose.model('faqs', faqSchema);

module.exports = Faqs;