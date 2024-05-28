import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';

const DashJobs = () => {
    const dispatch = useDispatch();
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        dispatch(jobLoadAction());
    }, [dispatch]);

    const { jobs, loading } = useSelector(state => state.loadJobs);
    const data = jobs || [];

    const handleDeleteClick = (id) => {
        setDeleteJobId(id);
        setOpenDialog(true);
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

    const handleDialogClose = () => {
        setOpenDialog(false);
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
                    <Button onClick={() => handleDeleteClick(values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
        },

    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs list
            </Typography>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this job?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} autoFocus color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
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
