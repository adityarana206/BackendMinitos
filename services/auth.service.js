const jwt = require('jsonwebtoken');

class AuthService {
  static formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    return phoneNumber.startsWith('+') ? phoneNumber : `+${cleaned}`;
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static validateIndianPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return /^[6-9]\d{9}$/.test(cleaned);
    }
    
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      const mobileNumber = cleaned.substring(2);
      return /^[6-9]\d{9}$/.test(mobileNumber);
    }
    
    return false;
  }
}

module.exports = AuthService;