const mongoose = require('mongoose');
const schema = mongoose.Schema;

const replySchema = new schema({

    replyId:{
        type: String,
        required: true,
        unique: true
    },

    messageId: {
        type: schema.Types.ObjectId,
        ref: 'customerMessages',
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

const Replies = mongoose.model('adminMessageReply', replySchema);

module.exports = Replies;           