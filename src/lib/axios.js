import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Gunakan import.meta.env untuk Vite
});

export default API;