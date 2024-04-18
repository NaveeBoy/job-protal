import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { jobLoadAction } from '../../redux/actions/jobAction'; // Assuming you have a loadJobsAction in your jobAction file

const JobTable = () => {
    const dispatch = useDispatch();
    const { jobs, loading } = useSelector((state) => state.loadJobs);

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    return (
        <>
           <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Job Types list
            </Typography>
            <TableContainer component={Paper} sx={{ border: '1px solid #fff' }}>
            
            <Table >
                <TableHead >
                    <TableRow sx={{ backgroundColor: 'secondary.midNightBlue'}}>
                        <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Title</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Location</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Category</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                    {loading ? (
                        <TableRow >
                            <TableCell colSpan={5} >Loading...</TableCell>
                        </TableRow>
                    ) : (
                        jobs.map((type) => (
                            <TableRow key={type.id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' }}}>
                                <TableCell sx={{ color: 'primary.contrastText', width: "200", alignContent: "center" }}>{type._id}</TableCell>
                                <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>{type.title}</TableCell>
                                <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>{type.location}</TableCell>
                                <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>
                                    {type.jobType && type.jobType.jobTypeName} {/* Access categoryName from jobType */}
                                </TableCell>
                                <TableCell sx={{ display: "flex" }}>
                                    <Button onClick={() => handleEdit(type.id)} variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button onClick={() => handleDelete(type.id)} color="error" variant="contained"> Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default JobTable;
