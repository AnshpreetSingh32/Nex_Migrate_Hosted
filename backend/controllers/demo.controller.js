// Demo controller for serving mock data in demo mode
const db = require('../models');

// Demo version of admin.getAllDevices - returns all devices with user info
exports.getDemoAdminDevices = async (req, res) => {
  try {
    const { status } = req.query; // Accept status as a query parameter like the real API
    
    // Return all demo devices with user information for admin dashboard
    const demoAdminDevices = [
      {
        deviceId: 21,
        device_name: "DEMO-LAPTOP-001",
        os_version: "Win10",
        ram_gb: 16,
        tpm_version: "2.0",
        cpu_generation: "11th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 22,
        device_name: "DEMO-LAPTOP-002",
        os_version: "Win10",
        ram_gb: 8,
        tpm_version: "1.2",
        cpu_generation: "7th Gen",
        isEligible: false,
        status: "Needs Review",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 23,
        device_name: "DEMO-LAPTOP-003",
        os_version: "Win11",
        ram_gb: 16,
        tpm_version: "2.0",
        cpu_generation: "10th Gen",
        isEligible: false,
        status: "Not Compatible",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 24,
        device_name: "DEMO-LAPTOP-004",
        os_version: "Win10",
        ram_gb: 8,
        tpm_version: "2.0",
        cpu_generation: "8th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 25,
        device_name: "DEMO-LAPTOP-005",
        os_version: "Win11",
        ram_gb: 16,
        tpm_version: "2.0",
        cpu_generation: "12th Gen",
        isEligible: false,
        status: "Migrated",
        migrationTriggered: true,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 26,
        device_name: "DEMO-LAPTOP-006",
        os_version: "Win10",
        ram_gb: 32,
        tpm_version: "2.0",
        cpu_generation: "12th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 27,
        device_name: "DEMO-LAPTOP-007",
        os_version: "Win10",
        ram_gb: 4,
        tpm_version: "1.2",
        cpu_generation: "6th Gen",
        isEligible: false,
        status: "Not Compatible",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 28,
        device_name: "DEMO-LAPTOP-008",
        os_version: "Win10",
        ram_gb: 16,
        tpm_version: "2.0",
        cpu_generation: "8th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 29,
        device_name: "DEMO-LAPTOP-009",
        os_version: "Win11",
        ram_gb: 8,
        tpm_version: "2.0",
        cpu_generation: "11th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      },
      {
        deviceId: 30,
        device_name: "DEMO-LAPTOP-010",
        os_version: "Win10",
        ram_gb: 12,
        tpm_version: "2.0",
        cpu_generation: "9th Gen",
        isEligible: true,
        status: "Ready",
        migrationTriggered: false,
        userId: 21,
        User: {
          email: "demo.user@nexmigrate.com",
          department: "DemoDept",
          location: "DemoCity"
        }
      }
    ];

    // Filter by status if provided (matching the real API behavior)
    const filteredDevices = status 
      ? demoAdminDevices.filter(device => device.status === status)
      : demoAdminDevices;

    res.json(filteredDevices);
  } catch (error) {
    console.error('Error fetching demo admin devices:', error);
    res.status(500).json({ message: 'Failed to fetch demo admin devices data' });
  }
};

// Demo version of user.getUserDeviceWithApps - returns user's device with applications
exports.getDemoUserDeviceWithApps = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Return demo device with applications (matching the real API structure)
    const demoDevice = {
      deviceId: 21,
      device_name: "DEMO-LAPTOP-001",
      os_version: "Win11",
      ram_gb: 16,
      tpm_version: "2.0",
      cpu_generation: "11th Gen",
      isEligible: false,
      status: "Migrated",
      migrationTriggered: true,
      userId: parseInt(userId),
      Applications: [
        {
          appId: 101,
          name: "Microsoft Office",
          version: "2019",
          reinstallRequired: true,
          deviceId: 21
        },
        {
          appId: 102,
          name: "Google Chrome",
          version: "114.0",
          reinstallRequired: false,
          deviceId: 21
        },
        {
          appId: 103,
          name: "Zoom",
          version: "5.15",
          reinstallRequired: true,
          deviceId: 21
        },
        {
          appId: 104,
          name: "Slack",
          version: "4.33",
          reinstallRequired: false,
          deviceId: 21
        },
        {
          appId: 105,
          name: "Visual Studio Code",
          version: "1.79",
          reinstallRequired: true,
          deviceId: 21
        },
        {
          appId: 106,
          name: "Adobe Reader",
          version: "23.003",
          reinstallRequired: false,
          deviceId: 21
        }
      ]
    };

    res.json({ device: demoDevice });
  } catch (error) {
    console.error('Error fetching demo user device with apps:', error);
    res.status(500).json({ message: 'Failed to fetch demo user device data' });
  }
};
