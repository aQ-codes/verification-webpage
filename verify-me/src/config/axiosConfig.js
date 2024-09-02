// src/config/axiosConfig.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Set your base URL here
});

export default api;
