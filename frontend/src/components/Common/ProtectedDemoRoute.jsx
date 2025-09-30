import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

const ProtectedDemoRoute = ({ children, role }) => {
  const location = useLocation(); // re-render on navigation
  const token = getToken();
  if (!token) return <Navigate to={role === 'admin' ? '/login-admin' : '/login-user'} replace state={{ from: location }} />;
  try {
    const decoded = jwtDecode(token);
    if (decoded.demo && decoded.role === role) {
      return children;
    }
    // Not a demo token or wrong role
    return <Navigate to={role === 'admin' ? '/login-admin' : '/login-user'} replace state={{ from: location }} />;
  } catch (e) {
    return <Navigate to={role === 'admin' ? '/login-admin' : '/login-user'} replace state={{ from: location }} />;
  }
};

export default ProtectedDemoRoute;
