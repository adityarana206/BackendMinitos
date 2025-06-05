const Item = require('../models/item.model');
const Category = require('../models/category.model');
const Subcategory = require('../models/Sub-Category.model');

const createItem = async (req, res) => {
    try {
        const itemData = req.body;
        
        // Validate required fields
        const requiredFields = ['name', 'brand', 'category', 'subcategory'];
        const missingFields = requiredFields.filter(field => !itemData[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `The following fields are required: ${missingFields.join(', ')}`,
                missingFields: missingFields
            });
        }

        // Optional: Validate if category and subcategory exist
        const categoryExists = await Category.findById(itemData.category);
        if (!categoryExists) {
            return res.status(400).json({ 
                message: "Invalid category ID. Category does not exist." 
            });
        }

        const subcategoryExists = await Subcategory.findById(itemData.subcategory);
        if (!subcategoryExists) {
            return res.status(400).json({ 
                message: "Invalid subcategory ID. Subcategory does not exist." 
            });
        }

        // Optional: Validate if subcategory belongs to the specified category
        if (subcategoryExists.category.toString() !== itemData.category) {
            return res.status(400).json({ 
                message: "Subcategory does not belong to the specified category." 
            });
        }

        // Create the item
        const item = await Item.create(itemData);
        
        // Populate references for response
        const populatedItem = await Item.findById(item._id)
            .populate('category', 'name')
            .populate('subcategory', 'name');
        
        return res.status(201).json({
            message: "Item created successfully",
            item: populatedItem
        });
        
    } catch (error) {
        console.error("Error creating item:", error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error",
                details: error.message 
            });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Duplicate entry found",
                details: error.message 
            });
        }
        
        return res.status(500).json({ 
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Additional CRUD operations for completeness
const getAllItems = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, subcategory, brand } = req.query;
        
        // Build filter object
        const filter = {};
        if (category) filter.category = category;
        if (subcategory) filter.subcategory = subcategory;
        if (brand) filter.brand = new RegExp(brand, 'i'); // Case-insensitive search
        
        const items = await Item.find(filter)
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Item.countDocuments(filter);
        
        return res.status(200).json({
            message: "Items retrieved successfully",
            items,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
        
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const item = await Item.findById(id)
            .populate('category', 'name')
            .populate('subcategory', 'name');
            
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        return res.status(200).json({
            message: "Item retrieved successfully",
            item
        });
        
    } catch (error) {
        console.error("Error fetching item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // If category or subcategory is being updated, validate them
        if (updateData.category) {
            const categoryExists = await Category.findById(updateData.category);
            if (!categoryExists) {
                return res.status(400).json({ 
                    message: "Invalid category ID. Category does not exist." 
                });
            }
        }
        
        if (updateData.subcategory) {
            const subcategoryExists = await Subcategory.findById(updateData.subcategory);
            if (!subcategoryExists) {
                return res.status(400).json({ 
                    message: "Invalid subcategory ID. Subcategory does not exist." 
                });
            }
        }
        
        const item = await Item.findByIdAndUpdate(id, updateData, { 
            new: true, 
            runValidators: true 
        })
        .populate('category', 'name')
        .populate('subcategory', 'name');
        
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        return res.status(200).json({
            message: "Item updated successfully",
            item
        });
        
    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        
        const item = await Item.findByIdAndDelete(id);
        
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        return res.status(200).json({
            message: "Item deleted successfully",
            item
        });
        
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};