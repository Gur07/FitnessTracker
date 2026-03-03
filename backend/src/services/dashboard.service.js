const mongoose = require("mongoose");
const Activity = require("../models/activity.model");

async function getDashboardSummary(userId) {

  const now = new Date();

  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - 7);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Total aggregation
  const summary = await Activity.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: null,
        totalWorkouts: { $sum: 1 },
        totalCalories: { $sum: "$caloriesBurned" },
        totalDuration: { $sum: "$duration" }
      }
    }
  ]);

  const weeklyWorkouts = await Activity.countDocuments({
    userId,
    date: { $gte: startOfWeek }
  });

  const monthlyCalories = await Activity.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfMonth }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$caloriesBurned" }
      }
    }
  ]);

  return {
    totalWorkouts: summary[0]?.totalWorkouts || 0,
    totalCalories: summary[0]?.totalCalories || 0,
    totalDuration: summary[0]?.totalDuration || 0,
    thisWeekWorkouts: weeklyWorkouts,
    thisMonthCalories: monthlyCalories[0]?.total || 0
  };
};

async function getStats(userId) {
  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6); // last 7 days including today

  const weeklyStats = await Activity.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" }
        },
        totalCalories: { $sum: "$caloriesBurned" },
        totalDuration: { $sum: "$duration" },
        workouts: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  const formattedData = weeklyStats.map(day => ({
    date: day._id,
    calories: day.totalCalories,
    duration: day.totalDuration,
    workouts: day.workouts
  }));

  return formattedData;
}

async function getBreakdown(userId) {
  const breakdown = await Activity.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: "$type",
        workouts: { $sum: 1 },
        totalCalories: { $sum: "$caloriesBurned" },
        totalDuration: { $sum: "$duration" }
      }
    },
    {
      $sort: { workouts: -1 }
    }
  ]);

  const formatted = breakdown.map(item => ({
    type: item._id,
    workouts: item.workouts,
    calories: item.totalCalories,
    duration: item.totalDuration
  }));

  return formatted;
}

module.exports = { getDashboardSummary, getStats, getBreakdown };