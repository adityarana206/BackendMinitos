const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rateLimitMiddleware = require('../middleware/rateLimit.middleware');

const router = express.Router();

// Apply rate limiting if available
let otpRateLimit, loginRateLimit;
try {
  otpRateLimit = rateLimitMiddleware({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 OTP requests per 15 minutes
    message: {
      success: false,
      message: 'Too many OTP requests. Please try again later.'
    }
  });

  loginRateLimit = rateLimitMiddleware({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 login attempts per 15 minutes
    message: {
      success: false,
      message: 'Too many login attempts. Please try again later.'
    }
  });
} catch (error) {
  // Fallback to no rate limiting if middleware not available
  otpRateLimit = (req, res, next) => next();
  loginRateLimit = (req, res, next) => next();
}

// Routes
router.post('/send-otp', otpRateLimit, AuthController.sendOTP);
router.post('/verify-otp', loginRateLimit, AuthController.verifyOTP);
router.post('/resend-otp', otpRateLimit, AuthController.resendOTP);
router.get('/profile', authMiddleware, AuthController.getProfile);
router.patch('/profile', authMiddleware, AuthController.updateProfile);
router.post('/logout', authMiddleware, AuthController.logout);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Auth service is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;