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

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

    sendDate: {
        type: Date,
        required: true,
        default: Date.now
    },

}, {timestamps : true});

const Feedbacks = mongoose.model('customer_feedback', feedbackSchema);

module.exports = Feedbacks;