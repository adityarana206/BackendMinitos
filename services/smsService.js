const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class SMSService {
  static async sendOTP(phoneNumber, otp) {
    try {
      const message = await client.messages.create({
        body: `Your verification code is: ${otp}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      return { success: true, messageId: message.sid };
    } catch (error) {
      console.error('SMS Error:', error);
      return { success: false, error: error.message };
    }
  }

  static formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if missing (assuming US +1)
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    if (!cleaned.startsWith('1') && cleaned.length === 11) {
      return `+${cleaned}`;
    }
    
    return `+${cleaned}`;
  }
}

module.exports = SMSService;