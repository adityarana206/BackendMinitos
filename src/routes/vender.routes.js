const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vender.controller');

// Create a new vendor
router.post('/', vendorController.createVendor);

// Get all vendors
router.get('/', vendorController.getAllVendors);

// Get a single vendor by ID
router.get('/:id', vendorController.getVendorById);

// Update a vendor
router.put('/:id', vendorController.updateVendor);

// Delete a vendor
router.delete('/:id', vendorController.deleteVendor);

module.exports = router;
