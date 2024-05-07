const mongoose = require('mongoose');
// for user
const credential = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'Please enter name']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    role: {
        type: Number,
        required: [true, 'Please enter role']
    }
})

module.exports = mongoose.model('userSchema', credential);

