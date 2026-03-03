const express = require('express');
const router = express.Router();    
const { getSummary, getweeklySummary, getActivityBreakdown } = require("../controllers/dashboard.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.get('/summary', authMiddleware.authUser, getSummary);
router.get('/weekly-summary', authMiddleware.authUser, getweeklySummary);
router.get("/activity-breakdown", authMiddleware.authUser, getActivityBreakdown);

module.exports = router;