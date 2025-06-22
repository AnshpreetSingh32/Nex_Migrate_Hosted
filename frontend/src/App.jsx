import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import LoginUser from './pages/LoginUser';
import UserDashboard from './pages/User/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/Common/ProtectedRoute';
import AdminDeviceList from './pages/Admin/Dashboard';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from './components/Common/About';
import TermsOfService from './components/Common/TermsOfService';
import Privacypolicy from './components/Common/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDeviceList />
            </ProtectedRoute>
          } />
        <Route path="/user/dashboard" element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" transition={Slide} />
    </BrowserRouter>
  );
}

export default App;
