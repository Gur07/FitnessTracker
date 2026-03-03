import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // change if needed
  withCredentials: true,
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/register", data);
export const logoutUser = () => API.post("/auth/logout");