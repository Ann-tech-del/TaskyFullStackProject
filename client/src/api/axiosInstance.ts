import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "//localhost:5678",
  withCredentials: true
});

export default axiosInstance;