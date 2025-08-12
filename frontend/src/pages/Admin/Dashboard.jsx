import { useEffect, useState, useMemo } from 'react';
import axios from '../../api/axios'; // Ensure this path is correct
import { getToken } from '../../utils/auth'; // Ensure this path is correct
import NavbarComponent from '../../components/Common/Navbar'; // Ensure this path is correct
import Footer from '../../components/Common/Footer'; // Ensure this path is correct
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts'; // Renamed Recharts' Tooltip
import { ResponsiveContainer } from 'recharts';
import { Progress } from "@material-tailwind/react";
import ProtectedRoute from '../../components/Common/ProtectedRoute';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

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
  Tooltip, // Material Tailwind's Tooltip
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

// Updated TABLE_HEAD as per your design
const TABLE_HEAD = ["Device", "Department", "Status", "Migration", "Action"];

const AdminDeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [eligibleStats, setEligibleStats] = useState([]);
  const [osData, setOsData] = useState([]);
  const [migrationStatusData, setMigrationStatusData] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // State to track active tab
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // State for progress bar

  // Get admin email from token
  let adminEmail = '';
  let adminId = '';
  try {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      adminEmail = decoded.email || '';
      adminId = decoded.adminId || '';

    }
  } catch (e) { }

  const fetchDevices = async () => {
    try {
      const res = await axios.get('/admin/devices', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setDevices(res.data);

      // Eligible vs Not Eligible
      const eligibleProcessed = [
        { name: 'Eligible', value: res.data.filter(d => d.isEligible).length },
        { name: 'NotEligible', value: res.data.filter(d => !d.isEligible).length }
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
      console.error('Failed to fetch devices:', err);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchMigrationStatus = async () => {
      try {
        const response = await axios.get('/admin/migration-status');
        setMigrationStatusData(response.data.data);
      } catch (error) {
        console.error('Error fetching migration status data:', error);
      }
    };

    fetchMigrationStatus();
  }, []);

  // Revert the migration field update logic to show 'Triggered' immediately
  const triggerMigration = async (deviceId) => {
    try {
      setDevices(prevDevices => prevDevices.map(device =>
        device.deviceId === deviceId ? { ...device, migration: 'Triggered' } : device
      ));

      setIsLoading(true); // Show loading screen
      setProgress(0); // Reset progress bar

      // Smooth progress bar increment
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1; // Increment progress by 1% every 100ms for smoothness
        });
      }, 100);

      // Simulate a 10-second delay for loading
      setTimeout(async () => {
        // Existing call to trigger migration
        await axios.post(`/admin/trigger-migration/${deviceId}`, {},
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          },
        );

        // ***** NEW: Call to log the migration trigger *****
        try {
          await axios.post('/admin/migrate-log', { deviceId }, {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          // Optionally, add a success toast or log for this action
          toast.success('Migration log registered successfully!');
          // console.log('Migration log registered for device:', deviceId);
        } catch (logError) {
          console.error('Failed to register migration log:', logError);
          // Optionally, inform the user if logging fails, though the main migration might still proceed
          toast.error('Failed to register migration log.');
        }
        // ***** END NEW *****

        // Fetch updated devices to reflect 'Completed' status (or other statuses)
        await fetchDevices();
        setIsLoading(false); // Hide loading screen
      }, 10000); // 10 seconds delay
    } catch (err) {
      console.error('Migration failed:', err);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  // Send Email function for Needs Review devices
  const sendEmail = async (deviceId) => {
    try {
      await axios.post('/admin/send-email', { deviceId, adminId }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      }).then(res => {
        toast.success(res.data.message || 'Email sent successfully!');
      }).catch(err => {
        toast.error(
          err.response?.data?.message || 'Failed to send email. Please try again.'
        );
      });
    } catch (err) {
      toast.error('Failed to send email. Please try again.');
    }
  };

  const generateServiceRequest = async (device) => {
    try {
      const response = await axios.post('/admin/servicenow', { device }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      toast.success(response.data.message || 'ServiceNow request created successfully!');
      // Optionally, you might want to refresh device data or update UI state here
      // await fetchDevices(); 
    } catch (err) {
      console.error('Error creating ServiceNow request:', err);
      toast.error(
        err.response?.data?.message || 'Failed to create ServiceNow request. Please try again.'
      );
    }
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
        <Tooltip content="Open Migration Menu">
          <MenuHandler>
            <IconButton
              variant="text"
              disabled={isMigrated} // Disable the entire menu if the device is migrated
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
                ? "Device is marked 'Ready' and is currently on Windows 10 — eligible for migration."
                : "Migration not allowed — device is either not 'Ready' or not running Windows 10."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span> {/* Wrapper for tooltip on disabled item */}
              <MenuItem
                onClick={() => triggerMigration(device.deviceId)}
                className={isEligibleWindows10 ? "" : "menu-disabled"}
                disabled={!isEligibleWindows10}
              >
                <RocketLaunchIcon className="h-5 w-5 mr-2" /> Trigger Migration
              </MenuItem>
            </span>
          </Tooltip>

          {/* Send Email MenuItem */}
          <Tooltip
            content={
              needsReview
                ? "Device requires manual review — email notification can be sent to the user."
                : "Email option is only available if device status is 'Needs Review'."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span> {/* Wrapper for tooltip on disabled item */}
              <MenuItem
                onClick={() => sendEmail(device.deviceId)}
                className={needsReview ? "" : "menu-disabled"}
                disabled={!needsReview}
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" /> Send Email
              </MenuItem>
            </span>
          </Tooltip>

          {/* Generate Service Request MenuItem */}
          <Tooltip
            content={
              notCompatible
                ? "Device is marked 'Not Compatible' — a request for a new device can be generated."
                : "Service request available only for devices marked 'Not Compatible'."
            }
            placement="left"
            className="bg-black text-white"
          >
            <span> {/* Wrapper for tooltip on disabled item */}
              <MenuItem
                onClick={() => generateServiceRequest(device)}
                className={notCompatible ? "" : "menu-disabled"}
                disabled={!notCompatible}
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" /> Generate Service Request
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
      <main className="flex-1 flex flex-col items-center px-2 sm:px-4 py-6 w-full max-w-full overflow-x-hidden">
        {/* Login-style border wrapper start */}

        <div className="relative bg-gray-300 p-4 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full flex flex-col items-center max-w-full">
          <div className="relative w-full flex flex-col items-center mb-8">
            <h1 className="text-4xl font-extrabold mb-2 text-center text-black tracking-tight drop-shadow-[0_2px_16px_rgba(34,211,238,0.7)]">
              Admin Dashboard
            </h1>
            <p className="text-black mb-2 text-lg">Welcome{adminEmail ? `, ${adminEmail}` : ', Admin'}!</p>
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
                  Loading, please wait...
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
                      Device List
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-700">
                      Manage all your devices
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
              <CardBody className="overflow-y-auto px-0 pt-0 bg-gray-100 " style={{ maxHeight: '60vh' }}>
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
                              className="font-bold text-black"
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </>
  );
};

const AdminDashboard = () => (
  <ProtectedRoute role="admin">
    <AdminDeviceList />
  </ProtectedRoute>
);

export default AdminDashboard;