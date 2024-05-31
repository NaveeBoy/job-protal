const express = require('express');
const router = express.Router();
const {
    allUsers,
    singleUser,
    editUser,
    deleteUser,
    createUserJobsHistory,
    allSeekers,
    updateUserJobHistory,
    deleteUserJobHistory
} = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// user routes

// /api/allusers
router.get('/allusers', allUsers);

// /api/user/:id
router.get('/user/:id', isAuthenticated, singleUser);

// /api/user/edit/:id
router.put('/user/edit/:id',  editUser);

// /api/admin/user/delete/:id
router.delete('/admin/user/delete/:id', deleteUser);

// /api/user/jobhistory
router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

// /api/user/jobhistory/:jobId
router.put('/user/jobhistory/:jobId',  updateUserJobHistory);
router.delete('/user/jobhistory/:jobId', deleteUserJobHistory);

// /api/seekers
router.get('/seekers', allSeekers);


// Define your API route for updating job application status
router.put('/user/jobhistory/:jobHistoryId', async (req, res) => {
    try {
        // Your existing code for updating job application status

        // Retrieve user's email from the request body
        const { userEmail, applicationStatus } = req.body;

        // Send email to relevant user
        await sendEmail(userEmail, applicationStatus);

        res.status(200).send("Job application status updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update job status");
    }
});



module.exports = router;
