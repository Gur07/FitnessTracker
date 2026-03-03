import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const getActivities = () => API.get("/activities");
export const createActivity = (data) => API.post("/activities", data);
export const updateActivity = (id, data) => API.put(`/activities/${id}`, data);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);