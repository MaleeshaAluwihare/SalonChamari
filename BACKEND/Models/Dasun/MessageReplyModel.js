const mongoose = require('mongoose');
const schema = mongoose.Schema;

const replySchema = new schema({

    replyId:{
        type: String,
        required: true,
        unique: true
    },

    messageId: {
        type: String,
        required: true
    },

    reply: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    }

}, {timestamps : true});

const Replies = mongoose.model('adminReplies', replySchema);

module.exports = Replies;