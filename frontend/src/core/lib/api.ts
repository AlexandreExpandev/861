import axios from 'axios';

/**
 * @singleton api
 * @summary Centralized Axios instance for making API requests.
 * @type api-client
 * @category core-library
 */
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // The backend wraps successful responses in a `data` object
    return response.data.data;
  },
  (error) => {
    // Handle API errors globally
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    // You could trigger a global notification here
    return Promise.reject(new Error(message));
  }
);
