import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Typography, TablePagination } from '@mui/material';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';


const JobTypeTable = () => {
    const dispatch = useDispatch();
    const { jobType, loading } = useSelector((state) => state.jobTypeAll);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    

   

    return (
        <>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Job Types list
            </Typography>
        <TableContainer component={Paper} sx={{ border: '1px solid #fff' }}>
            <Table >
                <TableHead >
                    <TableRow sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                    {/* <TableCell sx={{ width: 5}}><Checkbox></Checkbox></TableCell> */}
                        <TableCell sx={{ color: 'primary.contrastText',width:"200" }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' ,width:"200"}}>Category</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText',width:"200" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                    {loading ? (
                        <TableRow >
                            <TableCell colSpan={3} >Loading...</TableCell>
                        </TableRow>
                    ) : (
                        jobType.map((type) => (
                            <TableRow key={type.id} sx={{ backgroundColor: '#0277bd' }} >
                                {/* <TableCell sx={{ width: 5}}><Checkbox></Checkbox></TableCell> */}
                                <TableCell sx={{ color: 'primary.contrastText',width:"200",alignContent:"center"}}>{type._id}</TableCell>
                                <TableCell sx={{ color: 'primary.contrastText',width:"200" }}>{type.jobTypeName}</TableCell>
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

export default JobTypeTable;
