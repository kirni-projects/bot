// src/apiConfig.jsx
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://bot-rd1k.onrender.com/api'  // Production URL
  : '/api';  // Proxy for development

export default apiUrl;
