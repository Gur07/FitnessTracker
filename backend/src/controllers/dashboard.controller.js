const dashboardService = require("../services/dashboard.service");

async function getSummary(req, res) {
  try {
    const userId = req.user.id;

    const summaryData = await dashboardService.getDashboardSummary(userId);

    return res.status(200).json({
      success: true,
      data: summaryData
    });

  } catch (error) {
    console.error("Dashboard Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard summary"
    });
  }
};

async function getweeklySummary(req, res) {
    try {
    const userId = req.user.id;

    const weeklyData = await dashboardService.getStats(userId);

    return res.status(200).json({
      success: true,
      data: weeklyData
    });

  } catch (error) {
    console.error("Weekly Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch weekly stats"
    });
  }
}

async function getActivityBreakdown(req, res) {
    try {
    const userId = req.user.id;

    const breakdown = await dashboardService.getBreakdown(userId);

    return res.status(200).json({
      success: true,
      data: breakdown
    });

  } catch (error) {
    console.error("Activity Breakdown Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity breakdown"
    });
  }
}

module.exports = { getSummary,getweeklySummary,getActivityBreakdown };