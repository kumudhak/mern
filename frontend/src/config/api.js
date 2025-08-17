// src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mern-e2ws4wg20-kumudhas-projects-dff62ea2.vercel.app'  // Replace with your Railway URL
  : 'http://localhost:4000';                   // Local development

export default API_BASE_URL;
