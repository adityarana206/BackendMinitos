const category = require("../models/Category.model");

const createcategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate required field
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Check for duplicate category name
    const existingcategory = await category.findOne({ 
      name: name.trim().toLowerCase() 
    });
    
    if (existingcategory) {
      return res.status(400).json({
        message: "category with this name already exists",
      });
    }

    const newcategory = new category({
      name: name.trim(),
    });

    await newcategory.save();

    res.status(201).json({
      message: "category created successfully",
      category: newcategory,
    });
  } catch (error) {
    console.error("Error in createcategory:", error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "category with this name already exists",
      });
    }
    
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    // Build search filter
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Get categories with pagination
    const categories = await category.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await category.countDocuments(filter);

    res.status(200).json({
      message: "Categories retrieved successfully",
      categories: categories, // BUG FIX: This was missing in your original code
      count: categories.length,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getcategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    const category = await category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    res.status(200).json({
      message: "category retrieved successfully",
      category: category,
    });
  } catch (error) {
    console.error("Error in getcategoryById:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getcategoryWithSubcategories = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    const category = await category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    // Get subcategories for this category
    const Subcategory = require("../models/subCategory.model");
    const subcategories = await Subcategory.find({ category: id })
      .sort({ name: 1 });

    res.status(200).json({
      message: "category with subcategories retrieved successfully",
      category: {
        ...category.toObject(),
        subcategories: subcategories,
        subcategoryCount: subcategories.length
      }
    });
  } catch (error) {
    console.error("Error in getcategoryWithSubcategories:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    // Validate required field
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Check for duplicate category name (excluding current category)
    const existingcategory = await category.findOne({ 
      name: name.trim().toLowerCase(),
      _id: { $ne: id }
    });
    
    if (existingcategory) {
      return res.status(400).json({
        message: "category with this name already exists",
      });
    }

    const updatedcategory = await category.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedcategory) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    res.status(200).json({
      message: "category updated successfully",
      category: updatedcategory,
    });
  } catch (error) {
    console.error("Error in updatecategory:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }
    
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deletecategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    // Optional: Check if category has subcategories
    const Subcategory = require("../models/subCategory.model");
    const subcategoryCount = await Subcategory.countDocuments({ category: id });
    
    if (subcategoryCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category. It has ${subcategoryCount} subcategory(ies). Please delete subcategories first.`,
      });
    }

    // Optional: Check if category is being used by items
    // const Item = require("../models/item.model");
    // const itemCount = await Item.countDocuments({ category: id });
    // if (itemCount > 0) {
    //   return res.status(400).json({
    //     message: `Cannot delete category. It is being used by ${itemCount} item(s).`,
    //   });
    // }

    const deletedcategory = await category.findByIdAndDelete(id);

    if (!deletedcategory) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    res.status(200).json({
      message: "category deleted successfully",
      category: deletedcategory,
    });
  } catch (error) {
    console.error("Error in deletecategory:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getCategoriesWithCount = async (req, res) => {
  try {
    const Subcategory = require("../models/subCategory.model");
    
    // Get all categories
    const categories = await category.find().sort({ name: 1 });
    
    // Get subcategory counts for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const subcategoryCount = await Subcategory.countDocuments({ 
          category: category._id 
        });
        
        return {
          ...category.toObject(),
          subcategoryCount
        };
      })
    );

    res.status(200).json({
      message: "Categories with subcategory count retrieved successfully",
      categories: categoriesWithCount,
      count: categoriesWithCount.length,
    });
  } catch (error) {
    console.error("Error in getCategoriesWithCount:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createcategory,
  getAllCategories,
  getcategoryById,
  getcategoryWithSubcategories,
  updatecategory,
  deletecategory,
  getCategoriesWithCount,
};