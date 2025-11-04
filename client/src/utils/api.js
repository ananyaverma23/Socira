import axios from 'axios';

// Create a new 'instance' of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  
  // 2. Set default headers
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  IMPORTANT:
  When you set up JWT authentication, you will add an 'interceptor' here.
  It will automatically add the 'Authorization' header (with the token)
  to every single request after the user logs in.
*/

export default api;