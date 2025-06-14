// models/Promotion.js

const mongoose = require('mongoose');

// Define the Promotion Schema
const promotionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // Assuming you have a Product model
    }]
}, { timestamps: true });

// Create the model
module.exports = mongoose.model('Promotion', promotionSchema);


