// This file defines the routes for user-related operations
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/device-apps/:userId', userController.getUserDeviceWithApps);

router.put('/reinstall/:appId', userController.reinstallApplication);

module.exports = router;
