import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';

const JobTypeTable = () => {
    const dispatch = useDispatch();
    const { jobType, loading } = useSelector((state) => state.jobTypeAll);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const handleEdit = (id) => {
        // Handle edit action
    };

    const handleDelete = (id) => {
        // Handle delete action
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                        <TableCell sx={{ color: 'primary.contrastText' }}>ID</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Category</TableCell>
                        <TableCell sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={3}>Loading...</TableCell>
                        </TableRow>
                    ) : (
                        jobType.map((type) => (
                            <TableRow key={type.id}>
                                <TableCell>{type._id}</TableCell>
                                <TableCell>{type.jobTypeName}</TableCell>
                                <TableCell sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                                    <Button onClick={() => handleEdit(type.id)} variant="contained">Edit</Button>
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
