const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobTime:req.body.jobTime,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

// Get all jobs
exports.allJobs = async (req, res, next) => {
    try {
        const job = await Job.find();
        const totalJobs = job.length;
        res.status(200).json({
            success: true,
            total: totalJobs,
            job
        });
    } catch (error) {
        next(error);
    }
};

//single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


//update job by id.
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


//update job by id.
exports.showJobs = async (req, res, next) => {

    //enable search 
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    // filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    //jobs by jobTime
    let jobTimes = [];
    const jobByTime = await Job.find({}, { jobTime: 1 });
    jobByTime.forEach(val => {
        jobTimes.push(val.jobTime);
    });
    let setUniqueTime = [...new Set(jobTimes)];
    let jobTime = req.query.jobTime;
    let jobTimeFilter = jobTime !== '' ? jobTime : setUniqueTime;


    //enable pagination
    const pageSize = 10000000000000000000000000000000000000;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await Job.find({}).estimatedDocumentCount();
    const count = await Job.find({ ...keyword, jobType: categ, location: locationFilter ,jobTime:jobTimeFilter }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('jobType', 'jobTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation,
            setUniqueTime

        })
    } catch (error) {
        next(error);
    }
}





