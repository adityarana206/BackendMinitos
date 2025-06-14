// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    isActive: { type: Boolean, default: true } // Can help track abandoned carts
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
