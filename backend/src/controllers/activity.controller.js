const activityModel = require('../models/activity.model');
const jwt = require('jsonwebtoken');


async function createActivity(req, res) {
    const { type, duration, caloriesBurned, notes } = req.body;
    try {
        const activity = await activityModel.create({
            userId: req.user.id,
            type,
            duration,
            caloriesBurned,
            notes
        })
        res.status(201).json({
            message: "Activity created successfully",
            activity
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function getActivities(req, res) {
    const userid = req.user.id;
    try {
        const activities = await activityModel.find({ userId: userid });
        res.status(200).json({
            message: "Activities retrieved successfully",
            activities
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getActivityById(req, res) {
    const { id } = req.params;
    try {
        const activity = await activityModel.findById(id);  
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json({
            message: "Activity retrieved successfully",
            activity
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateActivity(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const activity = await activityModel.findOne({ _id: id, userId });

        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        activity.type = req.body.type || activity.type;
        activity.duration = req.body.duration || activity.duration;
        activity.caloriesBurned = req.body.caloriesBurned || activity.caloriesBurned;
        activity.notes = req.body.notes || activity.notes;

        await activity.save();

        res.status(200).json({
            message: "Activity updated successfully",
            activity
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

async function deleteActivity(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const activity = await activityModel.findOneAndDelete({ _id: id, userId });

        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        res.status(200).json({
            message: "Activity deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createActivity, getActivities, getActivityById, updateActivity, deleteActivity };