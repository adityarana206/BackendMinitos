// models/Category.js

const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Prevents duplicate category names
    },
    description: {
        type: String
    },
    image: {
        type: String // URL or local image path
    },
    isActive: {
        type: Boolean,
        default: true
    },
    parentCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        default: null // For creating sub-categories
    }
}, { timestamps: true });

// 
module.exports= mongoose.model('Category', categorySchema);


