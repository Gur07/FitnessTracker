const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const activityRoutes = require('./routes/activity.route');
const dashboardRoutes = require('./routes/dashboard.route');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use("/api/activities", activityRoutes)

module.exports = app;


