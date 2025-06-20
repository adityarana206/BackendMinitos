const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

// Load environment variables first
require("dotenv").config();

// Import service modules for testing
const twilio = require('twilio');
const cloudinary = require('cloudinary').v2;
const Razorpay = require('razorpay');

console.log("🔧 Environment Configuration Check:");
console.log("PORT:", process.env.PORT || "3000 (default)");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Found" : "❌ Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Found" : "❌ Missing");
console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID ? "✅ Found" : "❌ Missing");
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "✅ Found" : "❌ Missing");
console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER ? "✅ Found" : "❌ Missing");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME ? "✅ Found" : "❌ Missing");
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "✅ Found" : "❌ Missing");
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅ Found" : "❌ Missing");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ Found" : "❌ Missing");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "✅ Found" : "❌ Missing");
console.log("=====================================");

const connectDB = require("./config/db");

// Service Connection Tests
const testTwilioConnection = async () => {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error("Twilio credentials missing");
    }
    
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    // Test connection by fetching account info
    const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
    console.log("✅ Twilio Connected - Account Status:", account.status);
    return true;
  } catch (error) {
    console.error("❌ Twilio Connection Failed:", error.message);
    return false;
  }
};

const testCloudinaryConnection = async () => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary credentials missing");
    }
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Test connection by pinging the API
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connected - Status:", result.status);
    return true;
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed:", error.message);
    return false;
  }
};

const testRazorpayConnection = async () => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials missing");
    }
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    // Test connection by fetching payments (this will work even if empty)
    const payments = await razorpay.payments.all({ count: 1 });
    console.log("✅ Razorpay Connected - API Response received");
    return true;
  } catch (error) {
    console.error("❌ Razorpay Connection Failed:", error.message);
    return false;
  }
};

// Redis connection test
const testRedisConnection = async () => {
  try {
    // Check if Redis credentials are configured
    if (!process.env.REDIS_HOST || !process.env.REDIS_PORT || !process.env.REDIS_PASSWORD) {
      console.log("⚠️  Redis credentials not found in environment variables");
      console.log("Expected: REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_USERNAME (optional)");
      return false;
    }
    
    const { createClient } = require('redis');
    
    const client = createClient({
      username: process.env.REDIS_USERNAME || 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      }
    });
    
    client.on('error', err => console.log('Redis Client Error:', err.message));
    
    console.log("🔄 Connecting to Redis...");
    await client.connect();
    
    // Test basic operations
    await client.set('connection_test', 'success');
    const result = await client.get('connection_test');
    
    if (result === 'success') {
      console.log("✅ Redis Connected - Read/Write test passed");
      
      // Clean up test key
      await client.del('connection_test');
      await client.disconnect();
      return true;
    } else {
      throw new Error("Redis read/write test failed");
    }
    
  } catch (error) {
    console.error("❌ Redis Connection Failed:", error.message);
    return false;
  }
};

// Store loaded routes in an object
const routes = {};

// Load routes function - fixed version
const loadRoutes = () => {
  const routeConfigs = [
    { name: "auth", path: "./routes/auth.routes" },
    { name: "ads", path: "./routes/ads.route" },
    { name: "category", path: "./routes/category.routes" },
    { name: "subCategory", path: "./routes/subCategory.routes" },
    { name: "item", path: "./routes/item.routes" },
    { name: "admin", path: "./routes/admin.route" },
    { name: "cart", path: "./routes/cart.routes" },
    { name: "promotion", path: "./routes/promo.routes" },
    { name: "websiteSettings", path: "./routes/bottom.route" }
  ];

  console.log("\n🔧 Loading Routes:");
  routeConfigs.forEach(routeConfig => {
    try {
      const routeModule = require(routeConfig.path);
      routes[routeConfig.name] = routeModule;
      console.log(`✅ ${routeConfig.name} routes loaded`);
    } catch (err) {
      console.error(`❌ Error loading ${routeConfig.name} routes:`, err.message);
      routes[routeConfig.name] = null;
    }
  });
};

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
console.log("✅ Middleware configured");

// Rate limiting for auth
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later",
});
app.use("/api/auth", limiter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Detailed health check route
app.get("/health", async (req, res) => {
  const health = {
    server: "✅ Running",
    database: "❌ Not tested",
    twilio: "❌ Not tested",
    cloudinary: "❌ Not tested",
    razorpay: "❌ Not tested",
    redis: "❌ Not tested"
  };

  try {
    // Test MongoDB
    if (mongoose.connection.readyState === 1) {
      health.database = "✅ Connected";
    }

    // Test other services
    health.twilio = await testTwilioConnection() ? "✅ Connected" : "❌ Failed";
    health.cloudinary = await testCloudinaryConnection() ? "✅ Connected" : "❌ Failed";
    health.razorpay = await testRazorpayConnection() ? "✅ Connected" : "❌ Failed";
    health.redis = await testRedisConnection() ? "✅ Connected" : "❌ Failed";

  } catch (error) {
    console.error("Health check error:", error);
  }

  res.json(health);
});

// Main server startup function
const startServer = async () => {
  try {
    console.log("\n🚀 Starting Server...");
    
    // Step 1: Load routes
    loadRoutes();
    
    // Step 2: Connect to MongoDB
    console.log("\n🔄 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected successfully");
    
    // Step 3: Test external services
    console.log("\n🔄 Testing External Services...");
    await testTwilioConnection();
    await testCloudinaryConnection();
    await testRazorpayConnection();
    await testRedisConnection();
    
    // Step 4: Register routes - fixed version
    console.log("\n🔄 Registering Routes...");
    
    if (routes.auth) {
      app.use("/api/auth", routes.auth);
      console.log("✅ Auth routes registered at /api/auth");
    } else {
      console.error("❌ Auth routes not loaded");
    }
    
    if (routes.ads) {
      app.use("/api", routes.ads);
      console.log("✅ Ads routes registered at /api");
    }
    
    if (routes.category) {
      app.use("/api", routes.category);
      console.log("✅ Category routes registered at /api");
    }
    
    if (routes.subCategory) {
      app.use("/api", routes.subCategory);
      console.log("✅ SubCategory routes registered at /api");
    }
    
    if (routes.item) {
      app.use("/api/items", routes.item);
      console.log("✅ Item routes registered at /api/items");
    }
    
    if (routes.admin) {
      app.use("/api/admin", routes.admin);
      console.log("✅ Admin routes registered at /api/admin");
    }
    
    if (routes.cart) {
      app.use("/api/cart", routes.cart);
      console.log("✅ Cart routes registered at /api/cart");
    }
    
    if (routes.promotion) {
      app.use("/api/promo", routes.promotion);
      console.log("✅ Promotion routes registered at /api/promo");
    }
    
    if (routes.websiteSettings) {
      app.use('/api/website-settings', routes.websiteSettings);
      console.log("✅ Website settings routes registered at /api/website-settings");
    }
    
    console.log("✅ Routes registration completed");
    
    // Step 5: Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("\n🎉 SERVER STARTED SUCCESSFULLY!");
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}`);
      console.log(`🔍 Detailed health: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
      console.log("=====================================");
    });
    
  } catch (error) {
    console.error("\n❌ FAILED TO START SERVER:");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();