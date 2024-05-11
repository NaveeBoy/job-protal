const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: ObjectId,
        ref: "JobType", // Assuming you have a JobType model
        required: [true, 'Job type is required'],
    },
    jobTime: {
        type: String,
        enum: ['full-time', 'part-time', 'both'],
        required: [true, 'Job time is required'],
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: [true, 'User is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
