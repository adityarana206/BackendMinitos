const Vendor = require('../models/Vendor.model');

// Create Vendor
exports.createVendor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      businessName,
      businessAddress,
    } = req.body;

    // Basic Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone must be a 10-digit number' });
    }
    if (!businessName || !businessName.trim()) {
      return res.status(400).json({ message: 'Business name is required' });
    }

    // Check for duplicate email
    const existingVendor = await Vendor.findOne({ email: email.trim().toLowerCase() });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }

    // Create new vendor
    const newVendor = new Vendor({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      businessName: businessName.trim(),
      businessAddress,
    });

    await newVendor.save();

    res.status(201).json({
      message: 'Vendor created successfully',
      vendor: newVendor,
    });
    
  } catch (error) {
    console.error('Error in createVendor:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        details: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Vendor with this email already exists',
      });
    }

    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


// Get All Vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().select('-password'); // Exclude password field

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({
        message: 'No vendors found',
      });
    }

    res.status(200).json({
      message: 'Vendors fetched successfully',
      vendors,
    });

  } catch (error) {
    console.error('Error in getAllVendors:', error);

    res.status(500).json({
      message: 'Server error while fetching vendors',
      error: error.message,
    });
  }
};

// Get Single Vendor
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select('-password');

    if (!vendor) {
      return res.status(404).json({
        message: 'Vendor not found',
      });
    }

    res.status(200).json({
      message: 'Vendor fetched successfully',
      vendor,
    });

  } catch (error) {
    console.error('Error in getVendorById:', error);

    res.status(500).json({
      message: 'Server error while retrieving vendor',
      error: error.message,
    });
  }
};


// Update Vendor
exports.updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!updatedVendor) {
      return res.status(404).json({
        message: 'Vendor not found',
      });
    }

    res.status(200).json({
      message: 'Vendor updated successfully',
      vendor: updatedVendor,
    });

  } catch (error) {
    console.error('Error in updateVendor:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error during update',
        details: error.message,
      });
    }

    res.status(500).json({
      message: 'Server error while updating vendor',
      error: error.message,
    });
  }
};


// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({
        message: 'Vendor not found',
      });
    }

    res.status(200).json({
      message: 'Vendor deleted successfully',
    });

  } catch (error) {
    console.error('Error in deleteVendor:', error);

    res.status(500).json({
      message: 'Server error while deleting vendor',
      error: error.message,
    });
  }
};

