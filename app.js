const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const authRoutes = require("./src/routes/auth");
const connectDB = require("./src/config/db");
const createAds = require("./src/routes/ads.route");
const { createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory } = require("./src/controllers/category.controller");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many OTP requests, please try again later",
});

app.use("/api/auth", limiter);

app.get("/", (req, res) => {
  res.send("You are connected");
});

app.use("/api", createAds);

app.use("/api",createCategory);
app.use("/api",getAllCategories);
app.use("/api",getCategoryById);
app.use("api",deleteCategory);
app.use("api",updateCategory);

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
