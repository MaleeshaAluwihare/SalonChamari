const mongoose = require('mongoose');

const schema = mongoose.Schema;

const feedbackSchema = new schema({

    feedbackId: {
        type: String,
        required: true,
        unique: true
    },

    bookingId: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    sendDate: {
        type: Date,
        required: true
    },

});

const Feedbacks = mongoose.model('feedback', feedbackSchema);

module.exports = Feedbacks;