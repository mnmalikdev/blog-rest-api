const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    comments: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending',
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true,
    },

}, { timestamps: true })
const Blog=mongoose.model('Blog',blogSchema);

module.exports=Blog;