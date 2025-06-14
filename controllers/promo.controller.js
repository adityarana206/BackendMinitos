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
      isActive
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

const updatePromotiom = async (req, res) => {
  try {
    const { title } = req.params;
    const { isActive } = req.body;

    if (!title || !isActive) {
      return res.status(400).json({ message: "All field are required" });
    }

    const promotion = await updatePromotiom.findOneAndUpdate(
      { title },
      {
        isActive,
      },
      { new: true, runValidators: true }
    );

    if (!title) {
      return res.status(404).json({ message: "Promotion Detail Not Found" });
    }

    res.status(200).json({
      message:"Pormotion details updated successfully",
      promotion
    });

  } catch (error) { console.error("Error in Promtion", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });}
};
module.exports={
  createPromotion,updatePromotiom
}