import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:4000", // Update baseURL to match backend
});

export default API;