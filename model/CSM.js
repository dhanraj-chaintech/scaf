const mongoose = require('mongoose');
// 0 user
// 1 support
// 2 master

const CSM = new mongoose.Schema({
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

module.exports = mongoose.model('csmSchema', CSM);

