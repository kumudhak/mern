// src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mern-production-a002.up.railway.app'  // Replace with your Railway URL
  : 'http://localhost:4000';                   // Local development

export default API_BASE_URL;
