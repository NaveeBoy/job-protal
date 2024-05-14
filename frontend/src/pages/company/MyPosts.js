import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { jobLoadAction } from '../../redux/actions/jobAction'; // Assuming you have a loadJobsAction in your jobAction file

const JobTable = () => {
    const dispatch = useDispatch();
    const { jobs, loading } = useSelector((state) => state.loadJobs);
    const { jobuser } = useSelector((state) => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const uid = user && user._id;
   
    

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    console.log(jobs); // Add this line to log the jobs array

    


    return (
        <>
        <h1>{user && user.firstName} {user && user.lastName} {uid}</h1>
        
           <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Posted Jobs
            </Typography>
            <TableContainer component={Paper} sx={{ border: '1px solid #fff',height: 400 }}>
            
            <Table >
                <TableHead >
                    <TableRow sx={{ backgroundColor: 'secondary.midNightBlue'}}>
                        <TableCell sx={{ color: 'primary.contrastText', }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', }}>Title</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', }}>Location</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', }}>Category</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText', }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                    {loading ? (
                        <TableRow >
                            <TableCell colSpan={5} >Loading...</TableCell>
                        </TableRow>
                    ) : (
                        jobs.map((type) => {
                            
                            return (
                                <TableRow key={type.id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' }}}>
                                    <TableCell sx={{ color: 'primary.contrastText',  alignContent: "center" }}>{type._id}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText', }}>{type.title}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText', }}>{type.location}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText',  }}>
                                        {type.jobType && type.jobType.jobTypeName} {/* Access categoryName from jobType */}
                                    </TableCell>
                                    <TableCell sx={{ display: "flex" }}>
                                        <Button onClick={() => handleEdit(type.id)} variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => handleDelete(type.id)} color="error" variant="contained"> Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
                
            </Table>
        </TableContainer>
        

        </>
    );
};

export default JobTable;
