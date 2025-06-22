const mongoose = require('mongoose'); // Add missing import
const Subcategory = require("../models/subCategory.model")
const Category = require("../models/Category.model");

// Helper function for consistent ObjectId validation
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Helper function to find category by ID or name
const findCategory = async (categoryInput) => {
  if (isValidObjectId(categoryInput)) {
    return await Category.findById(categoryInput);
  } else {
    return await Category.findOne({ name: categoryInput });
  }
};

const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category ID/name are required",
      });
    }

    // Find category by ID or name
    const categoryExists = await findCategory(category);

    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid category. Category does not exist.",
      });
    }

    // Use the found category's _id for creating subcategory
    const categoryId = categoryExists._id;

    // Check for duplicate subcategory name within the same category
    const existingSubcategory = await Subcategory.findOne({
      name: name.trim(),
      category: categoryId,
    });

    if (existingSubcategory) {
      return res.status(400).json({
        message: "Subcategory with this name already exists in this category",
      });
    }

    const subcategory = await Subcategory.create({
      name: name.trim(),
      category: categoryId,
    });

    // Populate the category for response
    const populatedSubcategory = await Subcategory.findById(
      subcategory._id
    ).populate("category", "name");

    return res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: populatedSubcategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);

    // Handle specific MongoDB errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate subcategory name in this category",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSubcategories = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (category) {
      // Handle both ObjectId and category name
      if (isValidObjectId(category)) {
        filter.category = category;
      } else {
        // Find category by name first
        const categoryDoc = await Category.findOne({ name: category });
        if (categoryDoc) {
          filter.category = categoryDoc._id;
        } else {
          return res.status(400).json({
            message: "Category not found",
          });
        }
      }
    }

    // Convert limit to number and set reasonable bounds
    const limitNum = Math.min(Math.max(parseInt(limit), 1), 100);
    const pageNum = Math.max(parseInt(page), 1);

    // Get subcategories with pagination
    const subcategories = await Subcategory.find(filter)
      .populate("category", "name")
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .sort({ name: 1 }); // Sort alphabetically

    const total = await Subcategory.countDocuments(filter);

    return res.status(200).json({
      message: "Subcategories retrieved successfully",
      subcategories,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid subcategory ID format",
      });
    }

    const subcategory = await Subcategory.findById(id).populate(
      "category",
      "name"
    );

    if (!subcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      message: "Subcategory retrieved successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate ObjectId format
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({
        message: "Invalid category ID format",
      });
    }

    // Validate if category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const subcategories = await Subcategory.find({ category: categoryId })
      .populate("category", "name")
      .sort({ name: 1 });

    return res.status(200).json({
      message: "Subcategories retrieved successfully",
      category: categoryExists.name,
      subcategories,
      count: subcategories.length,
    });
  } catch (error) {
    console.error("Error fetching subcategories by category:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid subcategory ID format",
      });
    }

    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category ID/name are required",
      });
    }

    // Find category by ID or name (consistent with create function)
    const categoryExists = await findCategory(category);
    if (!categoryExists) {
      return res.status(400).json({
        message: "Invalid category. Category does not exist.",
      });
    }

    const categoryId = categoryExists._id;

    // Check for duplicate subcategory name within the same category (excluding current subcategory)
    const existingSubcategory = await Subcategory.findOne({
      name: name.trim(),
      category: categoryId,
      _id: { $ne: id }, // Exclude current subcategory
    });

    if (existingSubcategory) {
      return res.status(400).json({
        message: "Subcategory with this name already exists in this category",
      });
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { name: name.trim(), category: categoryId },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!subcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid subcategory ID format",
      });
    }

    // Optional: Check if subcategory is being used by any items
    // const Item = require('../models/item.model');
    // const itemsUsingSubcategory = await Item.countDocuments({ subcategory: id });
    // if (itemsUsingSubcategory > 0) {
    //     return res.status(400).json({
    //         message: `Cannot delete subcategory. It is being used by ${itemsUsingSubcategory} item(s)`
    //     });
    // }

    const subcategory = await Subcategory.findByIdAndDelete(id).populate(
      "category",
      "name"
    );

    if (!subcategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  getSubcategoriesByCategory, // Fixed typo in function name
  updateSubcategory,
  deleteSubcategory,
};