const career = require("../models/career.model");

const createCareer = async (req, res) => {
  try {
    const {
      tittle,
      department,
      location,
      employement,
      description,
      applicationDeadline,
      isActive,
    } = req.body;

    if (
      !tittle ||
      !department ||
      !location ||
      !employement ||
      !department ||
      !applicationDeadline ||
      !isActive
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCareer = new career({
      tittle,
      description,
      location,
      employement,
      department,
      isActive,
    });

    await newCareer.save();

    res.status(201).json({
      message: "Career details update",
      career: newCareer,
    });
  } catch (error) {
    console.error("Error in Inserting Career Details", error);
    res.status(500).json({
      message: "Serrver Error",
      error: error.message,
    });
  }
};

module.exports = { createCareer };
