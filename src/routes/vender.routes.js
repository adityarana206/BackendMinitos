const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vender.controller');

// Create a new vendor
router.post('/createVendor', vendorController.createVendor);

// Get all vendors
router.get('/getAllVendors', vendorController.getAllVendors);

// Get a single vendor by ID
router.get('/getVendorById/:id', vendorController.getVendorById);

// Update a vendor
router.put('/updateVendor/:id', vendorController.updateVendor);

// Delete a vendor
router.delete('/deleteVendor/:id', vendorController.deleteVendor);

module.exports = router;
