// // models/Order.js
// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [
//         {
//             product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//             quantity: { type: Number, required: true }
//         }
//     ],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: { type: String, required: true },
//     paymentMethod: { type: String, default: 'Cash on Delivery' }, // Example: COD, Card, etc.
//     paymentStatus: { type: String, default: 'Unpaid' }, // Example: Unpaid, Paid
//     status: { type: String, default: 'Pending' } // Example: Pending, Shipped, Delivered, Cancelled
// }, { timestamps: true });

// module.exports = mongoose.model('Order', OrderSchema);
