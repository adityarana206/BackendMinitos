const userDetailSchema = require("../models/userdetails.model");

const UpdateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address, phone, profilePicture, email } = req.body;

    if (!address || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user detail by userId
    const userDetail = await userDetailSchema.findOneAndUpdate(
      { userId },
      { address, phone, profilePicture, email },
      { new: true, runValidators: true }
    );

    if (!userDetail) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      userDetail,
    });
  } catch (error) {
    console.error("Error in UpdateUserDetails:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  UpdateUserDetails,
  // Other user detail controller functions can be added here
};
