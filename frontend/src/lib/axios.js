import axios from "axios";
import server from "../enviroment"; // ✅ Import the server constant

export const axiosInstance = axios.create({
  baseURL: "https://textifybackend-9z34.onrender.com", // ✅ Uses the same server URL
  withCredentials: true, // Required for authentication
});
