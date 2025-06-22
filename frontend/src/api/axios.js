import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      removeToken();
      let role = null;
      try {
        const token = getToken();
        if (token) {
          const decoded = jwtDecode(token);
          role = decoded.role;
        }
      } catch (e) {
        // ignore decode errors
      }
      let loginPath = '/login-admin';
      if (role === 'user') loginPath = '/login-user';
      const currentPath = window.location.pathname;
      if (
        currentPath !== '/login-admin' &&
        currentPath !== '/login-user' &&
        currentPath !== loginPath
      ) {
        window.location.href = loginPath;
      }
      // If already on a login page, do nothing (let the toast show)
    }
    return Promise.reject(err);
  }
);

export default instance;
// This code sets up an Axios instance with interceptors for handling authentication tokens and response errors.
// The request interceptor adds the token to the headers if it exists, and the response interceptor handles 401 errors by removing the token and redirecting to the login page.