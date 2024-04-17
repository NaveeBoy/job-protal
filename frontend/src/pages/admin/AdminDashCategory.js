import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { Box } from '@mui/material'

const JobTypeTable = () => {
    const dispatch = useDispatch();
    const { jobType, loading } = useSelector((state) => state.jobTypeAll);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    

   

    return (
        <TableContainer component={Paper} sx={{ border: '1px solid #fff' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'secondary.midNightBlue' }}>
                    {/* <TableCell sx={{ width: 5}}><Checkbox></Checkbox></TableCell> */}
                        <TableCell sx={{ color: 'primary.contrastText' }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Category</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
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
                                <TableCell sx={{ color: 'primary.contrastText'}}>{type._id}</TableCell>
                                <TableCell sx={{ color: 'primary.contrastText' }}>{type.jobTypeName}</TableCell>
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
    );
};

export default JobTypeTable;
