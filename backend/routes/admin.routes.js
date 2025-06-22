// This file defines the routes for admin-related operations
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const db = require("../models");



router.get('/devices', adminController.getAllDevices);
router.post('/trigger-migration/:deviceId', adminController.triggerMigration);



// Add a new route for fetching migration status
router.get('/migration-status', adminController.getMigrationStatus);

router.get('/critical-devices', adminController.getCriticalDevices);
router.post('/migrate-log', adminController.migrateDeviceLog);
router.post('/servicenow', adminController.createServiceNowRequest);
router.get('/logs', adminController.getAdminLogs);
router.get('/migration-logs', adminController.getMigrationLogs);

// Route for sending email to user about device review
router.post('/send-email', adminController.sendEmail);

module.exports = router;
