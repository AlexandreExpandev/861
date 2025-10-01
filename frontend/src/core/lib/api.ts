import axios from 'axios';

/**
 * @singleton api
 * @summary Centralized Axios instance for API communication.
 * @type api-client
 * @category core-library
 */
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data.data, // Unpack the 'data' from our standard success response
  (error) => {
    // Handle global errors, e.g., redirect on 401
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
