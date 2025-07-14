import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fit-server-1626.onrender.com/api",
  
});

export default axiosInstance;
