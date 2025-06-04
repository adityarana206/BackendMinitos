// Import the correct Ad model
const { cloudinary } = require("../config/cloudinary");
const Ads = require("../models/ads.model");

const createAds = async (req, res) => {
  try {
    const { adsImage } = req.body;

    // Validate if image is provided
    if (!adsImage) {
      return res.status(400).json({
        message: "Ad image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(adsImage, {
      folder: "AdsMinitos",
    });

    // Create new ad with the Cloudinary URL
    const newAd = new Ads({
      adsImage: result.secure_url, // Use the Cloudinary URL, not the original base64
    });

    // Save to database
    await newAd.save();

    // Send success response
    res.status(201).json({
      message: "Ad uploaded successfully",
      ad: newAd,
      
    });
  } catch (error) {
    console.error("Error in createAds:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all ads
const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Ads retrieved successfully",
      ads: ads,
      count: ads.length,
    });
  } catch (error) {
    console.error("Error in getAllAds:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update ad
const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { adsImage } = req.body;

    let updateData = {};

    // If new image is provided, upload to Cloudinary
    if (adsImage) {
      // Get the old ad to delete old image from Cloudinary
      const oldAd = await Ad.findById(id);

      if (oldAd && oldAd.adsImage) {
        // Extract public_id from the old URL to delete it
        const publicId = oldAd.adsImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(`AdsMinitos/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(adsImage, {
        folder: "AdsMinitos",
      });

      updateData.adsImage = result.secure_url;
    }

    const updatedAd = await Ad.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAd) {
      return res.status(404).json({
        message: "Ad not found",
      });
    }

    res.status(200).json({
      message: "Ad updated successfully",
      ad: updatedAd,
    });
  } catch (error) {
    console.error("Error in updateAd:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete ad
const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({
        message: "Ad not found",
      });
    }

    // Delete image from Cloudinary
    if (ad.adsImage) {
      const publicId = ad.adsImage.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(`AdsMinitos/${publicId}`);
    }

    // Delete from database
    await Ad.findByIdAndDelete(id);

    res.status(200).json({
      message: "Ad deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAd:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createAds,
  getAllAds,
  // getAdById,
  updateAd,
  deleteAd,
};
