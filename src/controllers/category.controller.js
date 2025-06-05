const Category = require("../models/Category.model");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate required field
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ 
      name: name.trim().toLowerCase() 
    });
    
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists",
      });
    }

    const newCategory = new Category({
      name: name.trim(),
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    
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
        message: "Category with this name already exists",
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
    const categories = await Category.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Category.countDocuments(filter);

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

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      category: category,
    });
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getCategoryWithSubcategories = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Get subcategories for this category
    const Subcategory = require("../models/subcategory.model");
    const subcategories = await Subcategory.find({ category: id })
      .sort({ name: 1 });

    res.status(200).json({
      message: "Category with subcategories retrieved successfully",
      category: {
        ...category.toObject(),
        subcategories: subcategories,
        subcategoryCount: subcategories.length
      }
    });
  } catch (error) {
    console.error("Error in getCategoryWithSubcategories:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
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
    const existingCategory = await Category.findOne({ 
      name: name.trim().toLowerCase(),
      _id: { $ne: id }
    });
    
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    
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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    // Optional: Check if category has subcategories
    const Subcategory = require("../models/subcategory.model");
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

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getCategoriesWithCount = async (req, res) => {
  try {
    const Subcategory = require("../models/subcategory.model");
    
    // Get all categories
    const categories = await Category.find().sort({ name: 1 });
    
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
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryWithSubcategories,
  updateCategory,
  deleteCategory,
  getCategoriesWithCount,
};