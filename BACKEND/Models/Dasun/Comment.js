const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    commentId: {
        type: String,
        required: true,
        unique: true
    },

    commentCategory: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    }


});


const Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;