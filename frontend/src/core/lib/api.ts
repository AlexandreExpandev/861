import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied by Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    // Only add token for internal routes
    if (config.url && config.url.startsWith('/internal')) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
