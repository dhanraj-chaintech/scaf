// query schema
const mongoose = require('mongoose');

const queryschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    title: {
        type: String,
        required: [true, 'Please enter Title'],
        maxLength: [20, 'Reached word limit']
    },
    email: {
        type: String,
        required: [true, 'Please enter Title'],
    },
    details: {
        type: String,
        required: [true, 'Please enter details for better understanding']
    },
    status: {
        type: String
    },
    confirm: {
        type: Boolean
    },
    hourtosolve: {
        type: Number
    },
    support: {
        type: String
    }
}, { timestamps: { createdAt: true, updatedAt: false } }
)

module.exports = mongoose.model('queryschema', queryschema);

