import axios from "axios";

const API = axios.create({
  baseURL: "https://task-6-2-1zvc.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;;
  return config;
});

export default API;