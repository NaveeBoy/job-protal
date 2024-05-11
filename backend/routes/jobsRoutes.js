// routes/jobsRoutes.js

const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, allJobs } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Jobs routes

// POST /api/job/create
router.post('/job/create', isAuthenticated, createJob);
// GET /api/job/:id
router.get('/job/:id', singleJob);
// PUT /api/job/update/:job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// GET /api/jobs/show
router.get('/jobs/show', showJobs);
// GET /api/jobs/allJobs
router.get('/jobs/allJobs', allJobs);

module.exports = router;
