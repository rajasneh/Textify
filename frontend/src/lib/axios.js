import axios from "axios";
import server from "../enviroment"; // ✅ Import the server constant

export const axiosInstance = axios.create({
  baseURL: `${server}/api`, // ✅ Uses the same server URL
  withCredentials: true, // Required for authentication
});
