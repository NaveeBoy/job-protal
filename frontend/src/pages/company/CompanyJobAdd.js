import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyJobAdd = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTime, setJobTime] = useState("");

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const collectData = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!title || !description || !salary || !location || !jobType || !jobTime) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/job/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, salary, location, jobType, jobTime }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      toast.success('Job created successfully');
      closePopup();
    } catch (error) {
      toast.error('Job creation failed');
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={openPopup} color="success" variant="contained">
        + Add Job
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>Add New Job<IconButton onClick={closePopup} style={{ float: "right" }}><CloseIcon color="primary" /></IconButton></DialogTitle>
        <DialogContent>
          <div className="container">
            <br/>
            <form onSubmit={collectData}>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Salary"
                  fullWidth
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Location"
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <FormControl fullWidth>
                  <InputLabel id="job-type-label">Job Type</InputLabel>
                  <Select
                    labelId="job-type-label"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <MenuItem value={"Full-time"}>Full-time</MenuItem>
                    <MenuItem value={"Part-time"}>Part-time</MenuItem>
                    <MenuItem value={"Contract"}>Contract</MenuItem>
                    <MenuItem value={"Freelance"}>Freelance</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Select Jop Tmie</label>
                <Checkbox></Checkbox>
              </div>
              <Button type="submit" color="primary" variant="contained" fullWidth>
                Add Job
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

export default CompanyJobAdd;
