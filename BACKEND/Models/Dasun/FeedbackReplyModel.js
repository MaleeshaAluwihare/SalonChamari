const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackReplySchema = new Schema({

    fdReplyId: {
        type: String,
        required: true,
        unique: true
    },

    feedbackId: {
        type: String,
        required: true
    },

    reply: {
        type: String,
        required: true
    }


});


const FeedbackReply = mongoose.model('FeedbackReply', feedbackReplySchema);


module.exports = FeedbackReply;