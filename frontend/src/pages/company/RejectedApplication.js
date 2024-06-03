import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction'; // Assuming you have a loadJobsAction in your jobAction file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AcceptedApplications = () => {
    const [seekers, setSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [currentJobAction, setCurrentJobAction] = useState({ userId: null, jobHistoryId: null, status: '' });

    const dispatch = useDispatch();
    const { jobs } = useSelector((state) => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const uid = user && user._id;

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    useEffect(() => {
        const fetchSeekers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/seekers');
                setSeekers(response.data.seekers);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch seekers');
                setLoading(false);
            }
        };

        fetchSeekers();
    }, []);

    const handleOpenDialog = (userId, jobHistoryId, status, userEmail,jobTitle) => {
        setCurrentJobAction({ userId, jobHistoryId, status, userEmail ,jobTitle});
        setOpenDialog(true);
    };
    

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmAction = async () => {
        const { userId, jobHistoryId, status, userEmail } = currentJobAction;
        try {
            await axios.put(`http://localhost:9000/api/user/jobhistory/${jobHistoryId}`, { applicationStatus: status });
            await axios.post('http://localhost:9000/api/send-email', { userEmail, status });
            // Update the seekers state to reflect the changes
            setSeekers(prevSeekers =>
                prevSeekers.map(seeker =>
                    seeker._id === userId
                        ? {
                            ...seeker,
                            jobsHistory: seeker.jobsHistory.map(job =>
                                job._id === jobHistoryId ? { ...job, applicationStatus: status } : job
                            )
                        }
                        : seeker
                )
            );
            toast.success(`Job application ${status}!`);
        } catch (error) {
            console.error("Error:", error); // Log the error to the console
            setError('Failed to update job status');
            toast.error('Failed to update job status');
        }
        setOpenDialog(false);
    };
    
    

    const handlePreviewCV = (cvPath) => {
        const width = 800;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        window.open(
            `http://localhost:9000/${cvPath}`,
            'CV Preview',
            `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`
        );
    };

    const filterSeekers = () => {
        if (!jobs || !seekers) return [];

        return seekers.map(seeker => ({
            ...seeker,
            jobsHistory: seeker.jobsHistory.filter(jobHistory => 
                jobHistory.applicationStatus === 'rejected' &&
                jobs.some(job => 
                    job.user && job.user._id === uid &&
                    job.title === jobHistory.title &&
                    job.description === jobHistory.description &&
                    job.location === jobHistory.location &&
                    job.salary === jobHistory.salary
                )
            )
        })).filter(seeker => seeker.jobsHistory.length > 0);
    };

    const filteredSeekers = filterSeekers();

    return (
        <>
        <br/>
        <br/>
            <ToastContainer />
            <Typography variant="h4" sx={{ color: "white", pb: 3, textAlign: "center" }}>
                Rejected Job Applications
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>Error: {error}</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ border: '1px solid #fff', height: 370, position: 'relative', backgroundColor: '#0277bd' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'secondary.midNightBlue', position: 'sticky', top: 0 }}>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>First Name</TableCell>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Last Name</TableCell>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 400 }}>Job Apply Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: 'secondary.midNightBlue', paddingTop: '48px' }}>
                            {filteredSeekers.map(seeker => (
                                <TableRow key={seeker._id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' } }}>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>{seeker.firstName}</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>{seeker.lastName}</TableCell>
                                    <TableCell>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Title</TableCell>
                                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Application Status</TableCell>
                                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {seeker.jobsHistory.map(job => (
                                                    <TableRow key={job._id}>
                                                        <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>{job.title}</TableCell>
                                                        <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>{job.applicationStatus}</TableCell>
                                                        <TableCell align="center">
                                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => handleOpenDialog(seeker._id, job._id, 'accepted', seeker.email)}
                                                                >
                                                                    Accept
                                                                </Button>
                                                                {/* <Button
                                                                    variant="contained"
                                                                    sx={{
                                                                        backgroundColor: 'red',
                                                                        '&:hover': {
                                                                            backgroundColor: 'lightcoral'
                                                                        }
                                                                    }}
                                                                    onClick={() => handleOpenDialog(seeker._id, job._id, 'rejected', seeker.email)}
                                                                >
                                                                    Reject
                                                                </Button> */}
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    onClick={() => handlePreviewCV(job.cv)}
                                                                >
                                                                    View CV
                                                                </Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to {currentJobAction.status.toLowerCase()} this job application?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmAction} color="error" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AcceptedApplications;
