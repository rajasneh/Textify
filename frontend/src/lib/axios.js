import axios from "axios";
import server from "../enviroment";
export const axiosInstance = axios.create({
  baseURL:server,
  withCredentials: true,
});
