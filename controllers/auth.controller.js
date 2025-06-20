// ===== 5. UPDATE controllers/auth.controller.js =====
const User = require('../models/user');
const AuthService = require('../services/auth.service');
const SMSService = require('../services/smsService');

class AuthController {
  static async sendOTP(req, res) {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is required'
        });
      }

      // Validate Indian phone number
      if (!AuthService.validateIndianPhoneNumber(phoneNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid Indian phone number'
        });
      }

      const formattedPhone = AuthService.formatPhoneNumber(phoneNumber);
      
      let user = await User.findOne({ phoneNumber: formattedPhone });
      if (!user) {
        user = new User({ phoneNumber: formattedPhone });
      }

      // Check rate limiting
      if (user.otp && user.otp.attempts >= 3 && new Date() < user.otp.expiresAt) {
        return res.status(429).json({
          success: false,
          message: 'Too many OTP attempts. Please try again later.'
        });
      }

      const otp = user.generateOTP();
      await user.save();

      const smsResult = await SMSService.sendOTP(formattedPhone, otp);
      
      if (!smsResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to send OTP. Please try again.'
        });
      }

      res.json({
        success: true,
        message: 'OTP sent successfully',
        data: { 
          phoneNumber: formattedPhone,
          expiresAt: user.otp.expiresAt
        }
      });

    } catch (error) {
      console.error('Send OTP Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async verifyOTP(req, res) {
    try {
      const { phoneNumber, otp } = req.body;
      
      if (!phoneNumber || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Phone number and OTP are required'
        });
      }

      if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        return res.status(400).json({
          success: false,
          message: 'OTP must be 6 digits'
        });
      }

      const formattedPhone = AuthService.formatPhoneNumber(phoneNumber);
      const user = await User.findOne({ phoneNumber: formattedPhone });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found. Please request a new OTP.'
        });
      }

      const isValid = user.verifyOTP(otp);
      
      if (!isValid) {
        await user.save();
        const remainingAttempts = Math.max(0, 3 - user.otp.attempts);
        return res.status(400).json({
          success: false,
          message: remainingAttempts > 0 
            ? `Invalid OTP. ${remainingAttempts} attempts remaining.`
            : 'Too many failed attempts. Please request a new OTP.',
          remainingAttempts
        });
      }

      // Mark user as verified and clear OTP
      user.isVerified = true;
      user.otp = undefined;
      await user.save();

      const token = AuthService.generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            profile: user.profile
          },
          token
        }
      });

    } catch (error) {
      console.error('Verify OTP Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async resendOTP(req, res) {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is required'
        });
      }

      const formattedPhone = AuthService.formatPhoneNumber(phoneNumber);
      const user = await User.findOne({ phoneNumber: formattedPhone });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found. Please start the login process again.'
        });
      }

      const otp = user.generateOTP();
      await user.save();

      const smsResult = await SMSService.sendOTP(formattedPhone, otp);
      
      if (!smsResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to resend OTP. Please try again.'
        });
      }

      res.json({
        success: true,
        message: 'OTP resent successfully',
        data: { 
          phoneNumber: formattedPhone,
          expiresAt: user.otp.expiresAt
        }
      });

    } catch (error) {
      console.error('Resend OTP Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('-otp');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            profile: user.profile
          }
        }
      });

    } catch (error) {
      console.error('Get Profile Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { name, email } = req.body;
      
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update profile
      user.profile = {
        ...user.profile,
        name: name || user.profile?.name,
        email: email || user.profile?.email
      };

      await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          user: {
            id: user._id,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            profile: user.profile
          }
        }
      });

    } catch (error) {
      console.error('Update Profile Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController;