import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const getSummary = () => API.get("/dashboard/summary");
export const getWeeklySummary = () => API.get("/dashboard/weekly-summary");
export const getActivityBreakdown = () => API.get("/dashboard/activity-breakdown");