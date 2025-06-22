import { Navigate } from 'react-router-dom';
import { isTokenValid, getUserRole } from '../../utils/auth';

const ProtectedRoute = ({ children, role }) => {
  const loginPath = role === "admin" ? "/login-admin" : "/login-user";
  const valid = isTokenValid();
  const userRole = getUserRole();

  if (!valid) return <Navigate to={loginPath} />;
  if (role && userRole !== role) return <Navigate to={loginPath} />;

  return children;
};

export default ProtectedRoute;
