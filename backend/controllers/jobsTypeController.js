const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            
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
        const jobT = await JobType.find();
        const totalJobTypes = jobT.length;
        res.status(200).json({
            success: true,
            total: totalJobTypes,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//update job type
exports.updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}


//delete job type
exports.deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}


// Update job type
exports.updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        if (!jobT) {
            return res.status(404).json({
                success: false,
                message: "Job type not found"
            });
        }
        res.status(200).json({
            success: true,
            jobT
        });
    } catch (error) {
        next(error);
    }
};


// Delete job type
exports.deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        if (!jobT) {
            return res.status(404).json({
                success: false,
                message: "Job type not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        });
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
};










