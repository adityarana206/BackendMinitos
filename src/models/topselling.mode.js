// models/TopSellingProduct.js

const mongoose = require('mongoose');

// Define the schema for Top Selling Product
const topSellingProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model
        required: true
    },
    soldQuantity: {
        type: Number,
        default: 0
    },

    lastSoldDate: {
        type: Date,
        default: Date.now
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    }
}, { timestamps: true });

// Create the model
module.exports = mongoose.model('TopSellingProduct', topSellingProductSchema);

