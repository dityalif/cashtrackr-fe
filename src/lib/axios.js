import axios from 'axios';

const API = axios.create({
  baseURL: "https://cashtrackr-be.vercel.app/", 

export default API;