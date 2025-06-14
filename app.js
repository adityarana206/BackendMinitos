const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adsRoutes = require("./routes/ads.route");
const categoryRoutes = require("./routes/category.routes");
const subCategoryRoutes = require("./routes/subCategory.routes");
const itemRoutes = require("./routes/item.routes");
const adminRoutes = require("./routes/admin.route"); // Admin routes
//const orders = require("./src/routes/order.routes");
const cart = require("./routes/cart.routes");
const promotion = require("./routes/promo.routes");
const websiteSettingsRoutes = require("./routes/bottom.route");


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting for auth (like OTP, login)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests
  message: "Too many OTP requests, please try again later",
});
app.use("/api/auth", limiter);

// Health check route
app.get("/", (req, res) => {
  res.send("You are connected");
});

// Connect to MongoDB
connectDB();

// Route registrations
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", adsRoutes); // Ad-related routes
app.use("/api", categoryRoutes); // Category routes
app.use("/api", subCategoryRoutes); // Subcategory routes
app.use("/api/items", itemRoutes); // Item routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/cart", cart); //cart
//app.use("/api/orders", orders); // Order
app.use("/api/promo", promotion); // Promotion
app.use('/api/website-settings', websiteSettingsRoutes); // BottomBar

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
