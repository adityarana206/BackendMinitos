const Admin = require("../models/admin.model");

const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
      },
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};



module.exports = {
  createAdmin,
  // Other admin controller functions can be added here
};
