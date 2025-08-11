import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import NavbarComponent from '../../components/Common/Navbar'; // Ensure this path is correct
import Footer from '../../components/Common/Footer';
import { Dialog, Button, Typography, Chip, Tooltip } from "@material-tailwind/react";
import { AppNotification, UploadSquare } from "iconoir-react";
import ProtectedRoute from '../../components/Common/ProtectedRoute';

const ReinstallModal = ({ app, onClose, onReinstall }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
    {/* Glow behind modal */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[420px] h-[320px] rounded-3xl bg-cyan-400 blur-[80px] opacity-80" />
    <Dialog size="sm" open={!!app} handler={onClose} className="bg-white p-0 rounded-2xl shadow-2xl border border-cyan-100 relative w-full max-w-md animate-fade-in-up">
      <div className="p-8 flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5.635 17.657A9 9 0 1112 21v-1m0-16V3m0 0a9 9 0 00-6.364 15.657" /></svg>
          </div>
          <Typography variant="h5" className="text-center text-black font-extrabold mb-2">Reinstall Application</Typography>
          <Typography className="text-center text-black mb-2">
            Are you sure you want to reinstall <span className="font-bold text-cyan-700">{app?.name}</span>?
          </Typography>
          <Typography className="text-center text-gray-600 text-sm mb-4">
            Reinstalling will replace the current version of the application.
          </Typography>
        </div>
        <div className="flex items-center justify-center gap-4 w-full mt-4">
          <Button
            className="w-1/2 bg-gray-200 text-black font-bold rounded-lg shadow-none hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 bg-cyan-600 text-white font-bold rounded-lg shadow-none hover:bg-cyan-700 transition"
            onClick={() => onReinstall(app?.id)}
          >
            Reinstall
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
);

// Added logic to display a custom Chip for device status
const getStatusChip = (status) => {
  let color = "blue";
  if (status === "Ready") color = "green";
  else if (status === "Needs Review") color = "yellow";
  else if (status === "Not Compatible") color = "red";

  return (
    <Chip
      variant="ghost"
      size="sm"
      value={status}
      color={color}
      className="w-fit"
    />
  );
};

const UserDashboard = () => {
  const [device, setDevice] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.get(`/user/device-apps/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setDevice(res.data.device);
      console.log(res.data.device);
      setApplications(res.data.device.Applications);
      console.log(res.data.device.Applications);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleReinstall = async (appId) => {
    try {
      await axios.put(`/user/reinstall/${appId}`, {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success("Reinstall initiated");
      setSelectedApp(null); // Close modal after reinstall
    } catch (err) {
      toast.error("Failed to reinstall application");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <ProtectedRoute role="user">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-100 to-cyan-50">
        <NavbarComponent />
        <main className="flex-1 flex flex-col items-center px-4 w-full">
          <div className="w-full max-w-6xl flex flex-col items-center relative flex-1">
            {/* Glow is now a child of the card container */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[110%] h-[100%] rounded-3xl bg-cyan-200 blur-[80px] opacity-60" />
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full flex flex-col items-center border border-black/10">
              <h1 className="text-4xl font-extrabold mb-2 text-center text-black drop-shadow-lg">User Dashboard</h1>
              {/* Glow underline for heading */}
              <div className="relative flex justify-center w-full mb-8">
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-48 h-2 rounded-full bg-cyan-400 blur-md opacity-80"></div>
              </div>
              {device && (
                <div className="relative mb-6 w-full flex justify-center">
                  {/* Glow behind card */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[105%] h-full rounded-2xl bg-cyan-200 blur-[60px] opacity-60" />
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-cyan-100 w-full max-w-2xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-black">Device Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 text-cyan-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2m-6 0h6" /></svg>
                        </span>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Device ID</div>
                          <div className="text-lg font-bold text-black">{device.deviceId}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 text-cyan-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </span>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Device Name</div>
                          <div className="text-lg font-bold text-black">{device.device_name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 text-cyan-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 11-4 0 2 2 0 014 0zm-6 0a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </span>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">Status</div>
                          <div className="mt-1">
                            <Chip
                              variant="ghost"
                              size="md"
                              value={device.status}
                              color={
                                device.status === 'Ready' ? 'green' :
                                device.status === 'Needs Review' ? 'yellow' :
                                device.status === 'Not Compatible' ? 'red' :
                                'cyan'
                              }
                              className="w-fit text-base px-4 py-2 font-bold"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 text-cyan-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </span>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">OS</div>
                          <div className="mt-1">
                            <Chip
                              variant="ghost"
                              size="md"
                              value={device.os_version}
                              color="cyan"
                              className="w-fit text-base px-4 py-2 font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-4 text-center text-black">Applications</h2>
              {/* Sort and split applications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Needs Reinstall */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-700 text-center">Needs Reinstall</h3>
                  <div className="flex flex-col gap-6">
                    {applications.filter(app => app.reinstallRequired).length === 0 && (
                      <div className="text-gray-400 text-center">No applications need reinstall.</div>
                    )}
                    {applications.filter(app => app.reinstallRequired).map(app => (
                      <div key={app.id} className="border border-cyan-100 p-6 rounded-xl shadow bg-white">
                        <h4 className="font-bold text-lg mb-2 text-black">{app.name}</h4>
                        <p className="text-black mb-2">Version: {app.version}</p>
                        <Tooltip
                          content={
                            device?.os_version === 'Win11' && device?.status === 'Migrated'
                              ? 'Click to reinstall this application.'
                              : 'Migration is still in process. Reinstall will be enabled after migration to Windows 11 is complete.'
                          }
                          placement="top"
                          className="bg-black text-white"
                          disabled={false}
                        >
                          <span>
                            <Button
                              onClick={() => setSelectedApp(app)}
                              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded shadow-none"
                              disabled={!(device?.os_version === 'Win11' && device?.status === 'Migrated')}
                            >
                              Reinstall
                            </Button>
                          </span>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Up-to-Date */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-700 text-center">Up-to-Date</h3>
                  <div className="flex flex-col gap-6">
                    {applications.filter(app => !app.reinstallRequired).length === 0 && (
                      <div className="text-gray-400 text-center">No up-to-date applications.</div>
                    )}
                    {applications.filter(app => !app.reinstallRequired).map(app => (
                      <div key={app.id} className="border border-cyan-100 p-6 rounded-xl shadow bg-white">
                        <h4 className="font-bold text-lg mb-2 text-black">{app.name}</h4>
                        <p className="text-black mb-2">Version: {app.version}</p>
                        <p className="text-cyan-600 font-medium">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value="Up-to-Date"
                            color="green"
                            className="w-fit"
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {selectedApp && (
                <ReinstallModal app={selectedApp} onClose={() => setSelectedApp(null)} onReinstall={handleReinstall} />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </ProtectedRoute>
  );
};

export default UserDashboard;