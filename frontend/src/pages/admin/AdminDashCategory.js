import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { jobTypeLoadAction, jobTypeDeleteAction } from '../../redux/actions/jobTypeAction';
import CategoryAdd from './CategoryAddPopUp';

const JobTypeTable = () => {
    const dispatch = useDispatch();
    const { jobType, loading } = useSelector((state) => state.jobTypeAll);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const handleDelete = () => {
        dispatch(jobTypeDeleteAction(selectedId)).then(() => {
            window.location.reload(); // Refresh the full page after deletion
        });
        handleClose();
    };

    return (
        <>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Job Category list
            </Typography>
            <div>
                <CategoryAdd />
            </div>
            <br />
            <TableContainer component={Paper} sx={{ border: '1px solid #fff', height: 400, position: 'relative' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'secondary.midNightBlue', position: 'sticky', top: 0 }}>
                            <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>ID</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Category</TableCell>
                            <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'secondary.midNightBlue', paddingTop: '48px' }}>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3}>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            jobType.map((type) => (
                                <TableRow key={type._id} sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: 'secondary.midNightBlue' } }}>
                                    <TableCell sx={{ color: 'primary.contrastText', width: "200", alignContent: "center" }}>{type._id}</TableCell>
                                    <TableCell sx={{ color: 'primary.contrastText', width: "200" }}>{type.jobTypeName}</TableCell>
                                    <TableCell sx={{ display: "flex" }}>
                                            &nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => handleClickOpen(type._id)} color="error" variant="contained">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this job type?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default JobTypeTable;
