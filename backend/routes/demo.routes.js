// Demo data routes for frontend demo mode
const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo.controller');

// Demo version of admin.getAllDevices
router.get('/admin/devices', demoController.getDemoAdminDevices);

// Demo version of user.getUserDeviceWithApps
router.get('/user/device-apps/:userId', demoController.getDemoUserDeviceWithApps);

module.exports = router;
