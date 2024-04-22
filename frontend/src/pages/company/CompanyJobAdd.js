import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';

const AdminAddPopUp = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [jobTime, setJobTime] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const collectData = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!title || !description || !salary || !jobTime || !location || !jobType) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/job/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          salary,
          jobTime,
          location,
          jobType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Admin Creation successful");
      closePopup();
    } catch (error) {
      toast.error("Admin Creation Failed");
    }
  };

  const dispatch = useDispatch();
  const { loading, error, jobTypes } = useSelector((state) => state.jobType); // Adjust this line according to your Redux store structure

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={openPopup} color="success" variant="contained">
        + Create Admin
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Create New Admin
          <IconButton onClick={closePopup} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <br />
            <form onSubmit={collectData}>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  label="Job Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  label="Job Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  label="Job Salary"
                  type="number"
                  fullWidth
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div>
                <label>Select Job Type: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                {jobTypes.map((jobType) => (
                  <Checkbox
                    key={jobType._id}
                    checked={jobType === jobType} // Adjust this line accordingly
                    onChange={() => setJobType(jobType)}
                  />
                ))}
              </div>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Create New Job
              </Button>
            </form>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default AdminAddPopUp;
