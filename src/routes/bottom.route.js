
// routes/websiteSettingsRoutes.js

const express = require('express');
const router = express.Router();
const { getWebsiteSettings, updateWebsiteSettings } = require('../controllers/bottom.controller');

// Get Website Settings
router.get('/getWebsiteSettings', getWebsiteSettings);

// Create or Update Website Settings
router.post('/updateWebsiteSettings', updateWebsiteSettings);

module.exports = router;
