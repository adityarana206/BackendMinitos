// models/Career.js

const mongoose = require('mongoose');

// Define the Career Schema
const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employmentType: {  // Example: Full-time, Part-time, Internship
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String
    },
    applicationDeadline: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Create the model
const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
