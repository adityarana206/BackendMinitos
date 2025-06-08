const admin = require('../models/admin.model');


const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new admin({
      name,
      email,
      phone,
      password, // Note: Password should be hashed before saving in production
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error in createvendor:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  // Other admin controller functions can be added here
};
