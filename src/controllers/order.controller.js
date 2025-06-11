// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place Order
exports.placeOrder = async (req, res) => {
    const { userId, shippingAddress, paymentMethod } = req.body;

    if (!userId || !shippingAddress) return res.status(400).json({ message: 'userId and shippingAddress are required' });

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalAmount = 0;

        cart.items.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });

        const newOrder = new Order({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            paymentStatus: paymentMethod === 'Online' ? 'Paid' : 'Unpaid'
        });

        await newOrder.save();

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Orders for User
exports.getUserOrders = async (req, res) => {
    const userId = req.query.userId;

    if (!userId) return res.status(400).json({ message: 'userId is required' });

    try {
        const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('items.product').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
