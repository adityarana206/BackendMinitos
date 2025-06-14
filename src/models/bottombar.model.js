// models/WebsiteSettings.js

const mongoose = require('mongoose');

// Define the schema
const websiteSettingsSchema = new mongoose.Schema({
    logo: {
        type: String, // URL or image path
    },
    companyDetails: {
        type: String
    },
    joinUs: {
        type: String
    },
    refundPolicy: {
        type: String
    },
    pricing: {
        type: String
    },
    faq: { // Frequently Asked Questions
        type: String
    },
    termsAndConditions: { // T&Q
        type: String
    },
    newsletter: {
        type: String
    },
    downloadLinks: [{
        platform: String, // Example: Android, iOS
        link: String
    }],
    contactUs: {
        email: String,
        phone: String,
        address: String
    }
}, { timestamps: true });

// Create the model
module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);

