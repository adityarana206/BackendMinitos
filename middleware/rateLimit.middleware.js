const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Simple rate limiting fallback (no external dependency)
const simpleRateLimit = (req, res, next) => next();

// Routes
router.post('/send-otp', simpleRateLimit, AuthController.sendOTP);
router.post('/verify-otp', simpleRateLimit, AuthController.verifyOTP);
router.post('/resend-otp', simpleRateLimit, AuthController.resendOTP);
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