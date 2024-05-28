import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { allUserAction } from '../../redux/actions/userAction';
import AdminAdd from './AdminAddPopUp';





const DashUsers = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(allUserAction());
    }, [dispatch]);

    const { users, loading } = useSelector(state => state.allUsers);
    let data = (users !== undefined && users.length > 0) ? users : [];

    const handleClickOpen = (id) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    const deleteUserById = async () => {
        try {
            await axios.delete(`http://localhost:9000/api/admin/user/delete/${selectedUserId}`);
            dispatch(allUserAction());  // Refresh the list after deletion
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        } finally {
            handleClose();
        }
    };

    const columns = [
        {
            field: '_id',
            headerName: 'User ID',
            width: 250,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'E_mail',
            width: 300,
        },
        {
            field: 'role',
            headerName: 'User status',
            width: 100,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : params.row.role === 0 ? "Regular user" : "Company"
            )
        },
        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={() => handleClickOpen(values.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                All users
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <AdminAdd />
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }
                        }}
                        getRowId={(row) => row._id}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteUserById} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashUsers;
