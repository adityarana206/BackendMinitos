const twilio = require('twilio');

class SMSService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendOTP(phoneNumber, otp) {
    const message = `Your MINUTOS verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`;
    return this.sendMessage(phoneNumber, message);
  }

  async sendWelcomeMessage(phoneNumber, name = '') {
    const message = name 
      ? `Welcome to MINUTOS, ${name}! Start exploring fresh groceries delivered to your doorstep. Happy shopping! 🛒`
      : `Welcome to MINUTOS! Start exploring fresh groceries delivered to your doorstep. Happy shopping! 🛒`;
    
    return this.sendMessage(phoneNumber, message);
  }

  async sendMessage(phoneNumber, message) {
    try {
      // Format phone number to international format
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      
      console.log('📱 Sending SMS:');
      console.log('  From:', process.env.TWILIO_PHONE_NUMBER);
      console.log('  To:', formattedNumber);
      console.log('  Message:', message.substring(0, 50) + '...');
      
      const result = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedNumber
      });

      console.log(`✅ SMS sent successfully to ${this.sanitizePhoneNumber(formattedNumber)}`);
      
      return {
        success: true,
        messageId: result.sid,
        status: result.status
      };

    } catch (error) {
      console.error('❌ SMS sending error:');
      console.error('  Error code:', error.code);
      console.error('  Error message:', error.message);
      console.error('  More info:', error.moreInfo);
      console.error('  Full error:', error);
      
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  }

  formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it's a 10-digit Indian number, add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // If it already has country code, add + if missing
    if (cleaned.length > 10 && !phoneNumber.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return phoneNumber;
  }

  sanitizePhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber.length < 4) return '****';
    
    const cleaned = phoneNumber.replace(/\D/g, '');
    const lastFour = cleaned.slice(-4);
    const hidden = '*'.repeat(Math.max(0, cleaned.length - 4));
    
    return `+${hidden}${lastFour}`;
  }
}

module.exports = new SMSService();