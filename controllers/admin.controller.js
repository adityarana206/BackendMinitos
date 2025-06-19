const admin = require("../models/admin.model");

const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
      }, // don't send password back
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
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
