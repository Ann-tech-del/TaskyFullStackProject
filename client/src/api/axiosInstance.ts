import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5678",
  withCredentials: true
});

export default axiosInstance;