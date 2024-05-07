const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const replyschema = new mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String,
    },
    reply: {
        type: String,
        required: [true]
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }// Automatically manage createdAt and updatedAt fields
})

module.exports = mongoose.model('replys', replyschema);

