import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://textifybackend-9z34.onrender.com/api", // ✅ Uses the same server URL
  withCredentials: true, // Required for authentication
});
