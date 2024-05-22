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
    Button
} from '@mui/material';

const SeekersTable = () => {
    const [seekers, setSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const handleAccept = (id) => {
        // Handle accept logic here
        console.log(`Accepted seeker with id: ${id}`);
    };

    const handleReject = (id) => {
        // Handle reject logic here
        console.log(`Rejected seeker with id: ${id}`);
    };

    const handlePutOnCV = (id) => {
        // Handle put on CV logic here
        console.log(`Put on CV seeker with id: ${id}`);
    };

    return (
        <>
            <Typography variant="h4" sx={{ color: "white", pb: 3 ,textAlign:"center"}}>
            job application
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>Error: {error}</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ border: '1px solid #fff', height: 370, position: 'relative',backgroundColor: '#0277bd' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'secondary.midNightBlue', position: 'sticky', top: 0 }}>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>First Name</TableCell>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Last Name</TableCell>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Job History Details</TableCell>
                                <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: 'secondary.midNightBlue', paddingTop: '48px' }}>
                            {seekers.map(seeker => (
                                <TableRow key={seeker._id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' }}}>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>{seeker.firstName}</TableCell>
                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>{seeker.lastName}</TableCell>
                                    <TableCell>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>Title</TableCell>
                                                    <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>Application Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {seeker.jobsHistory.map(job => (
                                                    <TableRow key={job._id}>
                                                        <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>{job.title}</TableCell>
                                                        <TableCell align="center" sx={{ color: 'primary.contrastText', width: 200, alignContent: "center" }}>{job.applicationStatus}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: 200 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAccept(seeker._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                mr: 1,
                                                backgroundColor: 'red',
                                                '&:hover': {
                                                    backgroundColor: 'lightcoral'
                                                }
                                            }}
                                            onClick={() => handleReject(seeker._id)}
                                        >
                                            Reject
                                        </Button>
                                        
                                        <Button
                                            style={{marginTop:"10px"}}
                                            variant="contained"
                                            color="success"
                                            onClick={() => handlePutOnCV(seeker._id)}
                                        >
                                            View CV
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default SeekersTable;
