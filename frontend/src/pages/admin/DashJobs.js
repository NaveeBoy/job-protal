import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';

const DashJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    const { jobs, loading } = useSelector(state => state.loadJobs);
    const data = jobs || [];

    const deleteJobById = (e, id) => {
        console.log(id);
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Job ID',
            width: 250,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Job Name',
            width: 170,
        },
        // Add more columns as needed
        {
            field: 'jobType',
            headerName: 'Category',
            width: 80,
            valueGetter: data => data.row.jobType.jobTypeName,
        },
        {
            field: 'user',
            headerName: 'User',
            width: 100,
            valueGetter: data => data.row.user.firstName,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            type: 'number',
            width: 150,
            renderCell: values => `Rs.${values.row.salary}.00`,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: values => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <Button onClick={() => deleteJobById(values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
        },

    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs list
            </Typography>
            {/* Conditionally render Add Job button based on user permissions */}
            {/* <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "white", textDecoration: "none" }} to="/admin/job/create">Create Job</Link>
                </Button>
            </Box> */}
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }
                        }}
                        rows={data}
                        columns={columns}
                       
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default DashJobs;
