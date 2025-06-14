// controllers/websiteSettingsController.js

const WebsiteSettings = require('../models/WebsiteSettings');

// Get Website Settings
 const getWebsiteSettings = async (req, res) => {
    try {
        const settings = await WebsiteSettings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Website settings not found' });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create or Update Website Settings
const updateWebsiteSettings = async (req, res) => {
    try {
        // Find existing setting
        let settings = await WebsiteSettings.findOne();

        if (settings) {
            // Update if settings exist
            settings = await WebsiteSettings.findOneAndUpdate({}, req.body, { new: true });
            res.status(200).json({ message: 'Website settings updated successfully', settings });
        } else {
            // Create if no settings exist
            const newSettings = new WebsiteSettings(req.body);
            await newSettings.save();
            res.status(201).json({ message: 'Website settings created successfully', settings: newSettings });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports= {getWebsiteSettings,updateWebsiteSettings}
