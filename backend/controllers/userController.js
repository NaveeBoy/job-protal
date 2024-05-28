const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const upload = require('../middleware/upload');

//load all users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10000;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
        return next(error);
    }
}

//show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


// jobs history
exports.createUserJobsHistory = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return next(new ErrorResponse(err, 400));
        }

        const { title, description, salary, location } = req.body;
        const cv = req.file.path;

        try {
            const currentUser = await User.findOne({ _id: req.user._id });
            if (!currentUser) {
                return next(new ErrorResponse("You must log In", 401));
            } else {
                const addJobHistory = {
                    title,
                    description,
                    salary,
                    location,
                    user: req.user._id,
                    cv // Add the CV path to the job history
                }
                currentUser.jobsHistory.push(addJobHistory);
                await currentUser.save();
            }

            res.status(200).json({
                success: true,
                currentUser
            });
            next();

        } catch (error) {
            return next(error);
        }
    });
}

// Get all seekers
exports.allSeekers = async (req, res, next) => {
    try {
        const seekers = await User.find({ role: 0 }).select('-password');
        res.status(200).json({
            success: true,
            seekers
        });
        next();
    } catch (error) {
        return next(error);
    }
};


// delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        return next(new ErrorResponse("Server error", 500));
    }
};




