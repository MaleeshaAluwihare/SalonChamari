const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({

    customerId: {
        type: String,
        required: true,
        unique: true
    },

    messageId: {
        type: String,
        required: true,
        unique: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps : true});

const Messages = mongoose.model('customerMessages', messageSchema);

module.exports = Messages;