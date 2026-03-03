const mongoose = require('mongoose');
const userModel = require('./user.model');

const activitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ["Running", "Cycling", "Swimming", "Walking", "Yoga", "Gym"],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
    }
});

module.exports = mongoose.model('Activity', activitySchema);