const mongoose = require('mongoose');

const schema = mongoose.Schema;

const blogSchema = new schema({

    blogId: {
        type: String,
        required: true,
        unique: true
    },

    topic: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String
    }

});

const Blogs = mongoose.model('blog', blogSchema);

module.exports = Blogs;