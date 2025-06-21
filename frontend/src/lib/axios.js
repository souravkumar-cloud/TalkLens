import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // or your API URL
  withCredentials: true,
});

export default axiosInstance; // ✅ THIS LINE IS IMPORTANT
