import { useEffect, useState, useMemo } from 'react';
import axios from '../../api/axios';
import { getToken } from '../../utils/auth';
import NavbarComponent from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { Progress } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Material Tailwind and Heroicons imports
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import { RocketLaunchIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";

// Constants for the Material Tailwind Table
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Eligible",
    value: "true",
  },
  {
    label: "NotEligible",
    value: "false",
  },
  {
    label: "Migrated",
    value: "migrated",
  },
];

const TABLE_HEAD = ["Device", "Department", "Status", "Migration", "Action"];

const DemoAdminDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [eligibleStats, setEligibleStats] = useState([]);
  const [osData, setOsData] = useState([]);
  const [migrationStatusData, setMigrationStatusData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Get admin email from demo token
  let adminEmail = '';
  try {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      adminEmail = decoded.email || 'Demo Admin';
    }
  } catch (e) {
    console.error('Error decoding token:', e);
  }

  const fetchDevices = async () => {
    try {
      // Use demo API instead of real API
      const res = await axios.get('/demo/admin/devices');
      setDevices(res.data);

      // Eligible vs Not Eligible
      const eligibleProcessed = [
        { name: 'Eligible', value: res.data.filter(d => d.isEligible).length },
        { name: 'Not Eligible', value: res.data.filter(d => !d.isEligible).length }
      ];
      setEligibleStats(eligibleProcessed);

      // Devices per OS
      const osStats = res.data.reduce((acc, device) => {
        const os = device.os_version || 'Unknown';
        acc[os] = (acc[os] || 0) + 1;
        return acc;
      }, {});
      const osProcessed = Object.entries(osStats).map(([key, value]) => ({
        name: key,
        value
      }));
      setOsData(osProcessed);

    } catch (err) {
      console.error('Failed to fetch demo devices:', err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    // Mock migration status data for demo
    const mockMigrationStatus = [
      { name: 'Pending', value: 6 },
      { name: 'Triggered', value: 1 },
      { name: 'Completed', value: 1 }
    ];
    setMigrationStatusData(mockMigrationStatus);
  }, []);

  // Demo version of trigger migration - shows demo message
  const triggerMigration = async (deviceId) => {
    try {
      setDevices(prevDevices => prevDevices.map(device =>
        device.deviceId === deviceId ? { ...device, migration: 'Triggered' } : device
      ));

      setIsLoading(true);
      setProgress(0);

      // Smooth progress bar increment
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      // Simulate a 5-second delay for demo
      setTimeout(async () => {
        // Show demo success message
        toast.success('Demo: Migration triggered successfully! (This is demo mode - no real migration occurred)');

        // Update device status to show it was "migrated"
        setDevices(prevDevices => prevDevices.map(device =>
          device.deviceId === deviceId
            ? {
              ...device,
              status: 'Migrated',
              migrationTriggered: true,
              isEligible: false,
              os_version: 'Win11'
            }
            : device
        ));

        setIsLoading(false);
      }, 5000); // 5 seconds for demo
    } catch (err) {
      console.error('Demo migration failed:', err);
      setIsLoading(false);
    }
  };

  // Demo version of send email - shows demo message
  const sendEmail = async (deviceId) => {
    try {
      toast.success('Demo: Email sent successfully! (This is demo mode - no real email was sent)');
    } catch (err) {
      toast.error('Demo: Failed to send email.');
    }
  };

  // Demo version of generate service request - shows demo message
  const generateServiceRequest = async (device) => {
    try {
      toast.success('Demo: ServiceNow request created successfully! (This is demo mode - no real request was created)');
    } catch (err) {
      console.error('Error creating demo ServiceNow request:', err);
      toast.error('Demo: Failed to create ServiceNow request.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out from demo mode');
    setTimeout(() => {
      navigate('/login-admin');
    }, 1200);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "true" && device.isEligible) ||
        (activeTab === "false" && !device.isEligible) ||
        (activeTab === "migrated" && device.status === "Migrated");

      const matchesSearch = device.User?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [devices, activeTab, searchTerm]);

  const renderActionMenu = (device) => {
    const isEligibleWindows10 = device.isEligible && device.os_version === "Win10" && !device.migrationTriggered;
    const needsReview = !device.isEligible && device.status === "Needs Review";
    const notCompatible = !device.isEligible && device.status === "Not Compatible";
    const isMigrated = device.status === "Migrated";

    return (
      <Menu>
        <Tooltip content="Open Migration Menu (Demo Mode)">
          <MenuHandler>
            <IconButton
              variant="text"
              disabled={isMigrated}
            >
              <SquaresPlusIcon className="h-6 w-6 text-blue-gray-800 transition-transform duration-300 ease-in-out hover:scale-110 hover:animate-bounce" />
            </IconButton>
          </MenuHandler>
        </Tooltip>
        <MenuList>
          {/* Trigger Migration MenuItem */}
          <Tooltip
            content={
              isEligibleWindows10
                ? "Demo: Device is marked 'Ready' and is currently on Windows 10 — eligible for migration."
                : "Demo: Migration not allowed — device is either not 'Ready' or not running Windows 10."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span>
              <MenuItem
                onClick={() => triggerMigration(device.deviceId)}
                className={isEligibleWindows10 ? "" : "menu-disabled"}
                disabled={!isEligibleWindows10}
              >
                <RocketLaunchIcon className="h-5 w-5 mr-2" /> Trigger Migration (Demo)
              </MenuItem>
            </span>
          </Tooltip>

          {/* Send Email MenuItem */}
          <Tooltip
            content={
              needsReview
                ? "Demo: Device requires manual review — email notification can be sent to the user."
                : "Demo: Email option is only available if device status is 'Needs Review'."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span>
              <MenuItem
                onClick={() => sendEmail(device.deviceId)}
                className={needsReview ? "" : "menu-disabled"}
                disabled={!needsReview}
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" /> Send Email (Demo)
              </MenuItem>
            </span>
          </Tooltip>

          {/* Generate Service Request MenuItem */}
          <Tooltip
            content={
              notCompatible
                ? "Demo: Device is not compatible — ServiceNow request can be created for manual review."
                : "Demo: ServiceNow request option is only available if device status is 'Not Compatible'."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span>
              <MenuItem
                onClick={() => generateServiceRequest(device)}
                className={notCompatible ? "" : "menu-disabled"}
                disabled={!notCompatible}
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" /> Generate Service Request (Demo)
              </MenuItem>
            </span>
          </Tooltip>
        </MenuList>
      </Menu>
    );
  };

  const renderMigrationStatus = (device) => {
    if (device.migration === 'Triggered') {
      return 'Triggered 🔄';
    }
    if (device.os_version === 'Win11' && device.migrationTriggered) {
      return 'Completed ✅';
    }
    return 'Pending ⏳';
  };

  return (
    <>
      <NavbarComponent />

      {/* Demo Mode Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-400">
                <strong>Demo Mode Active:</strong> You are currently viewing the admin dashboard in demo mode. All data shown is mock data and no real actions will be performed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center px-2 sm:px-4 py-6 w-full max-w-full overflow-x-hidden">
        {/* Login-style border wrapper start */}
        <div className="relative bg-gray-300 p-4 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full flex flex-col items-center max-w-full">
          <div className="relative w-full flex flex-col items-center mb-8">
            <h1 className="text-4xl font-extrabold mb-2 text-center text-black tracking-tight drop-shadow-[0_2px_16px_rgba(34,211,238,0.7)]">
              Admin Dashboard (Demo Mode)
            </h1>
            <p className="text-black mb-2 text-lg">Welcome{adminEmail ? `, ${adminEmail}` : ', Demo Admin'}!</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Exit Demo Mode
            </button>
          </div>

          {/* Charts Section - original graphs, inside card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8 max-w-full">
            {/* Migration Status Overview Chart */}
            <div className="rounded-xl w-full h-full content-center shadow-lg bg-gray-100 flex flex-col">
              <h2 className="text-xl font-semibold mt-2 text-center text-black">Migration Status Overview</h2>
              <div className="flex-1 w-full flex items-center justify-center mb-2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={migrationStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      <Cell fill="#fcd34d" /> {/* Pending */}
                      <Cell fill="#fb923c" /> {/* Triggered */}
                      <Cell fill="#4ade80" /> {/* Completed */}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Eligibility Status Chart */}
            <div className="rounded-xl w-full h-full content-center shadow-lg bg-gray-100 flex flex-col">
              <h2 className="text-xl font-semibold mt-2 text-center text-black">Eligibility Status</h2>
              <div className="flex-1 w-full flex items-center justify-center mb-2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={eligibleStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      <Cell fill="#4ade80" /> {/* Eligible */}
                      <Cell fill="#f87171" /> {/* Not Eligible */}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Devices by OS Chart */}
            <div className="rounded-xl w-full h-full content-center shadow-lg bg-gray-100 flex flex-col">
              <h2 className="text-xl font-semibold mt-2 text-center text-black">Devices by OS</h2>
              <div className="flex-1 w-full flex items-center justify-center mb-2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={osData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {osData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#60a5fa", "#a78bfa", "#fcd34d", "#fca5a5"][index % 4]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Progress Bar Overlay - moved outside table */}
          {isLoading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-[9999]">
              <div className="flex flex-col items-center w-[70vw]">
                <Progress value={progress} size="md" label="Completed..." className="w-full" />
                <Typography variant="small" className="mt-2 text-white">
                  Demo: Loading, please wait... (This is a demo simulation)
                </Typography>
              </div>
            </div>
          )}

          {/* Device Table with shadow */}
          <div className="rounded-xl w-full shadow-lg bg-white overflow-x-auto max-w-full">
            <Card className="w-full bg-gray-100 rounded-xl shadow flex flex-col">
              <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 mb-2">
                <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                  <div>
                    <Typography variant="h4" className="text-black font-bold">
                      Device List (Demo Data)
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-700">
                      Manage all your devices - Demo Mode
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-4 w-full">
                  <Tabs value={activeTab} className="w-full md:w-max">
                    <TabsHeader className="bg-gray-300">
                      {TABS.map(({ label, value }) => (
                        <Tab
                          key={value}
                          value={value}
                          onClick={() => handleTabChange(value)}
                          className={value === activeTab ? 'text-cyan-600 font-bold' : 'text-black'}
                        >
                          &nbsp;&nbsp;{label}&nbsp;&nbsp;
                        </Tab>
                      ))}
                    </TabsHeader>
                  </Tabs>
                  <div className="w-full md:w-72">
                    <Input
                      label="Search by Email"
                      icon={<MagnifyingGlassIcon className="h-5 w-5 text-cyan-500" />}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-black border-gray-700"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-y-auto px-0 pt-0 bg-gray-100" style={{ maxHeight: '60vh' }}>
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[700px] table-auto text-left">
                    <thead className="top-0 bg-cyan-200">
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head + index}
                            className="p-4"
                          >
                            <Typography
                              variant="small"
                              className="font-bold text-black text-base"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDevices.map(
                        (device, index) => {
                          const isLast = index === filteredDevices.length - 1;
                          const tdClasses = isLast
                            ? "p-4"
                            : "p-4 border-b border-cyan-100";
                          return (
                            <tr
                              key={device.deviceId}
                              className="hover:bg-white bg-gray-200 transition-colors duration-200 group"
                            >
                              {/* Column 1: Device ID & User Email */}
                              <td className={tdClasses + " group-hover:bg-transparent bg-transparent"}>
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                      <Typography
                                        variant="small"
                                        className="font-normal text-black"
                                      >
                                        {device.device_name}
                                      </Typography>
                                      <Chip
                                        variant="ghost"
                                        size="sm"
                                        value={device.os_version || "Unknown OS"}
                                        color="cyan"
                                      />
                                    </div>
                                    <Typography
                                      variant="small"
                                      className="font-normal text-gray-500"
                                    >
                                      {device.User?.email || 'N/A'}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              {/* Column 2: Department & Location */}
                              <td className={tdClasses + " group-hover:bg-transparent bg-transparent"}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    className="font-normal text-black"
                                  >
                                    {device.User?.department || 'N/A'}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    className="font-normal text-gray-500"
                                  >
                                    {device.User?.location || 'N/A'}
                                  </Typography>
                                </div>
                              </td>
                              {/* Column 3: Status (Eligible/Not Eligible) */}
                              <td className={tdClasses + " group-hover:bg-transparent bg-transparent"}>
                                <div className="flex flex-col items-start gap-1">
                                  <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={device.isEligible ? "Eligible" : "Not Eligible"}
                                    color={device.isEligible ? "green" : "red"}
                                  />
                                </div>
                              </td>
                              {/* Column 4: Migration Status */}
                              <td className={tdClasses + " group-hover:bg-transparent bg-transparent"}>
                                <Typography
                                  variant="small"
                                  className="font-normal text-black"
                                >
                                  {renderMigrationStatus(device)}
                                </Typography>
                              </td>
                              {/* Column 5: Action (Trigger Migration)*/}
                              <td className={tdClasses + " group-hover:bg-transparent bg-transparent"}>{renderActionMenu(device)}</td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        {/* Login-style border wrapper end */}
      </main>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
    </>
  );
};

export default DemoAdminDashboard;
