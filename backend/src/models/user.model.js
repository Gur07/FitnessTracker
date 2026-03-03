const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    age: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;