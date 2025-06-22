import { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch (e) {
    return false;
  }
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const { role } = jwtDecode(token);
    return role || null;
  } catch (e) {
    return null;
  }
};
