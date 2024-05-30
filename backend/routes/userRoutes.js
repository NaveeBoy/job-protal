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

module.exports = router;
