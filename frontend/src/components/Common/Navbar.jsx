import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Tooltip,
  Button as MTButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Nex_Migtrate image.png";
import { getUserRole } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

function NavList({ isHomePage, isLoggedIn }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const userRole = getUserRole();
  // Determine active state: role if logged in, else path
  const isAdmin = isLoggedIn ? userRole === 'admin' : currentPath === '/login-admin';
  const isUser = isLoggedIn ? userRole === 'user' : currentPath === '/login-user';
  const isLoginPage = currentPath === '/login-admin' || currentPath === '/login-user';

  // Button style logic
  const adminBtnClass = isLoginPage
    ? (isAdmin
        ? 'bg-white text-black border-white font-bold hover:border-gray-300 hover:shadow-[0_0_8px_2px_#e0e0e0] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400'
        : 'bg-black text-white border-white hover:border-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400')
    : 'bg-black text-white border-white hover:border-white hover:shadow-[0_0_8px_2px_#fff] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400';
  const userBtnClass = isLoginPage
    ? (isUser
        ? 'bg-white text-black border-white font-bold hover:border-gray-300 hover:shadow-[0_0_8px_2px_#e0e0e0] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400'
        : 'bg-black text-white border-white hover:border-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400')
    : 'bg-black text-white border-white hover:border-white hover:shadow-[0_0_8px_2px_#fff] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400';

  // Tooltip animation config
  const tooltipAnim = {
    mount: { scale: 1, y: 0 },
    unmount: { scale: 0, y: 25 },
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {isLoggedIn ? (
          <Tooltip content="Logout first" animate={tooltipAnim} placement="bottom">
            <span>
              <a
                href="#"
                className={`inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${adminBtnClass} cursor-not-allowed opacity-60`}
                tabIndex={-1}
                aria-disabled="true"
                onClick={e => e.preventDefault()}
              >
                Admin Login
              </a>
            </span>
          </Tooltip>
        ) : (
          <a
            href="/login-admin"
            className={`inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${adminBtnClass}`}
          >
            Admin Login
          </a>
        )}
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {isLoggedIn ? (
          <Tooltip content="Logout first" animate={tooltipAnim} placement="bottom">
            <span>
              <a
                href="#"
                className={`inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${userBtnClass} cursor-not-allowed opacity-60`}
                tabIndex={-1}
                aria-disabled="true"
                onClick={e => e.preventDefault()}
              >
                User Login
              </a>
            </span>
          </Tooltip>
        ) : (
          <a
            href="/login-user"
            className={`inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${userBtnClass}`}
          >
            User Login
          </a>
        )}
      </Typography>
    </ul>
  );
}

const NavbarComponent = ({ children }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(localStorage.getItem("token")));
  const isHomePage = window.location.pathname === "/";

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    const checkToken = () => setIsLoggedIn(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", checkToken);
    // Also check on mount
    checkToken();
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <style>
        {`
          :root {
            --navbar-height: 56px; /* Adjust this value based on the actual height of the navbar */
          }
        `}
      </style>
      <Navbar
        className="max-w-full fixed top-0 left-0 z-50 bg-black text-white shadow-lg right-0 p-0 lg:px-10 border-b border-white/10 overflow-visible"
        style={{ height: "var(--navbar-height)", borderRadius: "0", backgroundColor: "#000" }}
      >
        {/* Glowing bottom border accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2 bg-cyan-400/40 blur-lg pointer-events-none z-10" />
        <div className="relative flex items-center justify-between w-full">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-white flex items-center font-extrabold text-xl tracking-tight"
          >
            <img src={logo} alt="Logo" className="ml-2 h-9 w-20 mr-2" />
            Device Migration Portal
          </Typography>
          {/* Absolutely centered Home Button */}
          {(() => {
            const userRole = getUserRole();
            let userEmail = null;
            try {
              const token = localStorage.getItem('token');
              if (token) {
                const decoded = jwtDecode(token);
                userEmail = decoded.email;
              }
            } catch (e) {}
            if (Boolean(localStorage.getItem("token")) && (userRole === 'admin' || userRole === 'user')) {
              return (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <Tooltip content={`Logged in as ${userEmail || ''}`} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 } }} placement="bottom">
                    <span>
                      <MTButton
                        color="cyan"
                        className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold border border-cyan-600 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 shadow bg-cyan-600 hover:bg-cyan-700"
                        style={{ minWidth: '150px' }}
                        onClick={() => {
                          if (userRole === 'admin' && window.location.pathname !== '/admin/dashboard') window.location.assign('/admin/dashboard');
                          if (userRole === 'user' && window.location.pathname !== '/user/dashboard') window.location.assign('/user/dashboard');
                        }}
                      >
                        {userRole === 'admin' ? 'Go to Admin Dashboard' : 'Go to User Dashboard'}
                      </MTButton>
                    </span>
                  </Tooltip>
                </div>
              );
            }
            return null;
          })()}
          <div className="hidden lg:flex gap-6 items-center">
            <NavList isHomePage={isHomePage} isLoggedIn={isLoggedIn} />
            {/* Only show logout if logged in */}
            {isLoggedIn && (
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    toast.success('Logged out successfully!');
                    setTimeout(() => {
                      window.location.assign("/");
                    }, 500);
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2 text-base font-semibold text-red-500 border border-red-400 transition-all duration-150 hover:scale-105 hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  Logout
                </button>
              </Typography>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-white hover:bg-cyan-400/10 focus:bg-cyan-400/10 active:bg-cyan-400/20 transition-colors lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav} className="bg-black text-white border-t border-cyan-400/20">
          <NavList isHomePage={isHomePage} isLoggedIn={isLoggedIn} />
          {/* Only show logout if logged in (mobile) */}
          {isLoggedIn && (
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
            >
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success('Logged out successfully!');
                  setTimeout(() => {
                    window.location.assign("/login-user");
                  }, 500);
                }}
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2 text-base font-semibold text-red-500 border border-red-400 transition-all duration-150 hover:scale-105 hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Logout
              </button>
            </Typography>
          )}
        </Collapse>
      </Navbar>
      {/* Ensure the main content starts below the navbar */}
      <div style={{ marginTop: "var(--navbar-height)" }}>
        {children}
      </div>
    </>
  );
};

export default NavbarComponent;
