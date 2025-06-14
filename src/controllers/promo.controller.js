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

    if (!title||!description||!discountPercentage||!startDate||!endDate||!applicableProducts||isActive){
        return res.status(400).json({
            message:"Promotion Detail are required"
        })
    }


  } catch (error) {}
};
