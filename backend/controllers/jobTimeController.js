const jobTime = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJobType = async (req, res, next) => {
    try {
        const jobTi = await jobTime.create({
            jobTime: req.body.jobTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}


//all jobs category
exports.allJobsType = async (req, res, next) => {
    try {
        const jobTi = await jobTime.find();
        res.status(200).json({
            success: true,
            jobTi
        })
    } catch (error) {
        next(error);
    }
}