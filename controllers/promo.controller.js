const PromoCodeModel = require("../models/PromoCode.model");

const createPromotion = async (req, res) => {
  try {
    const {
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      isActive,
      applicableProducts,
    } = req.body;

    if (
      !title ||
      !description ||
      !discountPercentage ||
      !startDate ||
      !endDate ||
      !applicableProducts ||
      isActive===undefined
    ) {
      return res.status(400).json({
        message: "Promotion Detail are required",
      });
    }

    const newPromo = new PromoCodeModel({
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      isActive,
      applicableProducts,
    });

    await newPromo.save();

    res.status(201).json({
      message: "Promo created Sussessfully",
      promo: newPromo,
    });
  } catch (error) {
    console.error("Error in promotion creation", error);
    res.status(500).json({
      message: "Serrver Error",
      error: error.message,
    });
  }
};

const updatePromotion = async (req, res) => {
  try {
    
    const { title,isActive } = req.body;

    // Validate required fields
    if (!title || isActive === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find and update the promotion
    const promotion = await PromoCodeModel.findOneAndUpdate(
      { title },
      { isActive },
      { new: true, runValidators: true }
    );

    // Check if promotion exists
    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(200).json({
      message: "Promotion details updated successfully",
      promotion,
    });
  } catch (error) {
    console.error("Error in updating promotion:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports={
  createPromotion,updatePromotion
}