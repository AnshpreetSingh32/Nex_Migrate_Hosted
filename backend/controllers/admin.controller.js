const db = require('../models');
const { Device, ServiceRequest, MigrationLog, Application, User, AdminLog } = db;
const nodemailer = require('nodemailer');

// Fetch all critical devices
exports.getCriticalDevices = async (req, res) => {
    const devices = await Device.findAll({ where: { isEligible: false }, include: [User] });
    res.json(devices);
};

// Update the getAllDevices function to include filtering for 'Migrated' status
exports.getAllDevices = async (req, res) => {
  try {
    const { status } = req.query; // Accept status as a query parameter

    const whereClause = status ? { status } : {}; // Filter by status if provided

    const devices = await Device.findAll({
      where: whereClause,
      include: {
        model: User,
        attributes: ['email', 'department', 'location']
      }
    });
    res.json(devices);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).json({ message: 'Failed to fetch devices' });
  }
};

// Update the triggerMigration function to set migrationTriggered and isEligible fields
exports.triggerMigration = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const device = await Device.findByPk(deviceId);
    if (!device) return res.status(404).json({ message: 'Device not found' });

    if (device.isEligible && !device.migrationTriggered) {
      device.migrationTriggered = true;
      device.isEligible = false;
      device.status = 'Migrated'; // Update status to Migrated
      device.os_version = 'Win11'; // Change OS version to Win11
      await device.save();

      res.json({ message: 'Migration triggered successfully', device });
    } else {
      res.status(400).json({ message: 'Device is not eligible for migration' });
    }
  } catch (err) {
    console.error('Error triggering migration:', err);
    res.status(500).json({ message: 'Failed to trigger migration' });
  }
};

// Trigger migration script (mock)
exports.migrateDeviceLog = async (req, res) => {
    const { deviceId } = req.body;

    await MigrationLog.create({
        deviceId: deviceId,
        status: 'Migration Triggered',
        timestamp: new Date(),

    });

    res.json({ message: 'Migration script triggered (simulated)' });
};

// Create dummy ServiceNow request
exports.createServiceNowRequest = async (req, res) => {
    const { device } = req.body;

    try {
        // Check if a ServiceNow request already exists for this device
        const existingRequest = await ServiceRequest.findOne({
            where: { deviceId: device.deviceId }
        });
        if (existingRequest) {
            return res.status(409).json({ message: 'A ServiceNow request has already been created for this device.' });
        }

        // Optionally, fetch the user for a more personalized message
        const user = await User.findByPk(device.userId);
        const userName = user ? user.name || 'User' : 'User';

        const serviceRequest = await ServiceRequest.create({
            deviceId: device.deviceId,
            status: 'Created',
            message: `ServiceNow request created for device '${device.device_name}' (ID: ${device.deviceId}) assigned to ${userName}. Please review the device for Windows 11 migration compatibility.`,
            createdAt: new Date()
        });

        res.json({
            message: 'ServiceNow request created successfully.',
            serviceRequest
        });
    } catch (err) {
        console.error('Error creating ServiceNow request:', err);
        res.status(500).json({ message: 'Failed to create ServiceNow request' });
    }
};

// Add logic for sending email
exports.sendEmail = async (req, res) => {
  const { deviceId , adminId} = req.body;

  try {
    const device = await Device.findByPk(deviceId);

    if (!device || device.status !== 'Needs Review') {
      return res.status(400).json({ message: 'Device is not eligible for email action' });
    }

    // Fetch user associated with the device
    const user = await User.findByPk(device.userId);
    if (!user || !user.email) {
      return res.status(404).json({ message: 'User or email not found for this device' });
    }

    // Check if an email has already been sent for this device in AdminLog
    const existingLog = await AdminLog.findOne({
      where: {
        action: `Email sent to userId ${user.userId} for deviceId ${device.deviceId}`
      }
    });
    if (existingLog) {
      return res.status(409).json({ message: 'Email has already been sent for this device.' });
    }

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'anshpreetsingh3232@gmail.com', // Replace with your project email
        pass: 'iwsedhjihjhiaxam',             // Use app password or env var
      },
    });

    const mailOptions = {
      from: '"Nex-Migrate Support" <anshpreetsingh3232@gmail.com>',
      to: user.email,
      subject: 'Action Required: Your Device Needs Review for Windows 11 Migration',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
          <h2 style="color: #2e6cb8;">Windows 11 Migration Review Required</h2>
          <p>Hi ${user.name || 'User'},</p>
          <p>Our system has flagged your device <strong>${device.device_name}</strong> as <strong>needing review</strong> for the upcoming Windows 11 migration.</p>
          <p>Please visit the <strong>TechHub</strong> desk with your laptop between <strong>9:00 AM to 5:00 PM</strong> (Monday to Friday) for further assistance and evaluation.</p>
          <p>This step is essential to ensure your device meets all compatibility requirements before migration.</p>
          <br>
          <p>Thank you,</p>
          <p style="color: #888;">Nex-Migrate Support Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Log the email sent action in AdminLog
    await AdminLog.create({
      action: `Email sent to userId ${user.userId} for deviceId ${device.deviceId}`,
      timestamp: new Date(),
      adminId: adminId // Assuming adminId is passed in the request body
    });

    res.json({ message: 'Email sent successfully to the user', email: user.email });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

// Add logic for generating service request
exports.generateServiceRequest = async (req, res) => {
  const { deviceId } = req.body;
  try {
    const device = await Device.findByPk(deviceId);
    if (!device || device.status !== 'Not Compatible') {
      return res.status(400).json({ message: 'Device is not eligible for service request' });
    }

    await ServiceRequest.create({
      deviceId: deviceId,
      status: 'Created',
      message: 'Service request generated',
      createdAt: new Date()
    });

    res.json({ message: 'Service request generated successfully', device });
  } catch (err) {
    console.error('Error generating service request:', err);
    res.status(500).json({ message: 'Failed to generate service request' });
  }
};

//get admin logs
exports.getAdminLogs = async (req, res) => {
    const adminLogs = await AdminLog.findAll();
    res.json(adminLogs);
};

//get migration logs
exports.getMigrationLogs = async (req, res) => {
    const migrationLogs = await MigrationLog.findAll();
    res.json(migrationLogs);
};

// Add a new controller method to fetch migration status data
exports.getMigrationStatus = async (req, res) => {
  try {
    const totalDevices = await Device.count();
    const pending = await Device.count({ where: { migrationTriggered: false } });
    const triggered = await Device.count({ where: { migrationTriggered: true, status: { [db.Sequelize.Op.ne]: 'Migrated' } } });
    const completed = await Device.count({ where: { status: 'Migrated' } });

    res.json({
      totalDevices,
      data: [
        { name: 'Pending', value: pending },
        { name: 'Triggered', value: triggered },
        { name: 'Completed', value: completed },
      ],
    });
  } catch (err) {
    console.error('Error fetching migration status:', err);
    res.status(500).json({ message: 'Failed to fetch migration status' });
  }
};