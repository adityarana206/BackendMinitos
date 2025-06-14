const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subcategory name is required'],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }
}, { timestamps: true });

// Check if model exists before creating it
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
