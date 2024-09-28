// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5006', // Set your backend server URL here
});

export default axiosInstance;
