import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { jobLoadAction, deleteJobAction } from '../../redux/actions/jobAction';

const JobTable = () => {
    const dispatch = useDispatch();
    const { jobs, loading } = useSelector((state) => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const uid = user && user._id;
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    const userJobs = jobs ? jobs.filter(job => job.user && job.user._id === uid) : [];

    const handleEdit = (id) => {
        // Implement edit functionality
    };

    const handleDeleteClick = (id) => {
        setDeleteJobId(id);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteJobId(null);
    };

    const handleDeleteConfirmed = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/job/delete/${deleteJobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                // Reload jobs after deletion
                dispatch(jobLoadAction());
            } else {
                // Handle error
                console.error('Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        } finally {
            setOpenDialog(false);
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Posted Jobs
            </Typography>
            <TableContainer component={Paper} sx={{ border: '1px solid #fff', height: 400, backgroundColor: '#0277bd' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                            <TableCell sx={{ color: 'primary.contrastText' }}>ID</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Title</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Location</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Category</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5}>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            userJobs.map((job) => (
                                <TableRow key={job._id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' } }}>
                                    <TableCell sx={{ color: 'primary.contrastText', alignContent: "center" }}>{job._id}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }}>{job.title}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }}>{job.location}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText' }}>
                                        {job.jobType && job.jobType.jobTypeName}
                                    </TableCell>
                                    <TableCell sx={{ display: "flex" }}>
                                        <Button onClick={() => handleEdit(job._id)} variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => handleDeleteClick(job._id)} color="error" variant="contained">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirmed} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default JobTable;
