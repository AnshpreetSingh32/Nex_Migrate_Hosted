import { useState } from 'react';
import axios from '../api/axios';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Common/Navbar';  
import Footer from '../components/Common/Footer';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Helper to show error toast and refresh page on close or after 4s
  const showErrorToastAndRefresh = (message) => {
    let refreshed = false;
    const refresh = () => {
      if (!refreshed) {
        refreshed = true;
        window.location.reload();
      }
    };
    toast.error(message, {
      onClose: refresh,
      closeOnClick: true,
      closeButton: true,
      autoClose: 4000,
    });
    setTimeout(refresh, 4000);
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    // Client-side validation
    if (!email || !password) {
      showErrorToastAndRefresh('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      showErrorToastAndRefresh('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post('/auth/admin-login', { email, password });
      saveToken(res.data.token);
      // Decode token and check role
      const decoded = jwtDecode(res.data.token);
      if (decoded.role !== 'admin') {
        showErrorToastAndRefresh('Not an admin account.');
        setIsSubmitting(false);
        return;
      }
      navigate('/admin/dashboard'); // Redirect to admin dashboard after login
      toast.success('Login successful');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        showErrorToastAndRefresh(err.response.data.message);
      } else {
        showErrorToastAndRefresh('Login failed. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = email && password && validateEmail(email);

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen w-full bg-gradient-to-b from-black via-cyan-100 to-black flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full max-w-sm flex flex-col items-center relative">
          {/* Glow is now a child of the card container */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[420px] h-[320px] rounded-3xl bg-cyan-400 blur-[80px] opacity-90" />
          <div className="rounded-2xl p-[3px] bg-black w-full">
            <div className="rounded-2xl p-[3px] bg-gradient-to-br from-cyan-400/80 to-transparent w-full">
              <div className="relative bg-gray-100 p-8 rounded-2xl shadow-2xl w-full flex flex-col items-center border border-black/10">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-black tracking-tight transition-all duration-300 hover:[text-shadow:0_0_12px_#06b6d4,0_0_2px_#06b6d4] cursor-pointer">Admin Login</h2>
                <form className="w-full flex flex-col items-center" onSubmit={handleLogin} autoComplete="off">
                  <div className="relative w-full mb-5">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      className="peer w-full p-3 pr-10 border border-black/20 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="username"
                    />
                    {/* Validation icon */}
                    {email && (
                      validateEmail(email) ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      )
                    )}
                    <label
                      htmlFor="email"
                      className={`absolute left-3 text-gray-600 text-sm bg-gray-50 px-1 transition-all ${email ? 'top-[-10px] text-cyan-600' : 'top-3 text-gray-400 bg-transparent'} peer-focus:top-[-10px] peer-focus:text-cyan-600 peer-focus:bg-gray-50`}
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative w-full mb-8">
                    <input
                      type="password"
                      id="password"
                      placeholder=" "
                      className="peer w-full p-3 border border-black/20 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-3 text-gray-600 text-sm bg-gray-50 px-1 transition-all ${password ? 'top-[-10px] text-cyan-600' : 'top-3 text-gray-400 bg-transparent'} peer-focus:top-[-10px] peer-focus:text-cyan-600 peer-focus:bg-gray-50`}
                    >
                      Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-base font-semibold text-white border border-black/20 transition-all duration-150 hover:scale-105 hover:shadow-[0_0_12px_2px_#06b6d4] hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="colored" closeOnClick closeButton />
      <Footer />
    </>
  );
}

export default LoginAdmin;
