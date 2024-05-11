import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';

const CompanyJobAdd = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTime, setJobTime] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobTypes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/type/jobs');
        setJobTypes(response.data.jobT);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch job types");
        setLoading(false);
      }
    };
    fetchJobTypes();
  }, []);

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
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/job/create", {
        title,
        description,
        salary,
        location,
        jobType,
        jobTime,
      });

      if (response.status === 201) {
        // Job created successfully
        setError("");
        setTitle("");
        setDescription("");
        setSalary("");
        setLocation("");
        setJobType("");
        setJobTime("");
        closePopup();
      } else {
        setError("Failed to create job");
      }
    } catch (error) {
      setError("Failed to create job");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={openPopup} color="success" variant="contained">
        + Add Job
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Add New Job
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
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  type="number"
                  label="Salary (Rs.)"
                  fullWidth
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <TextField
                  label="Location"
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="job-type-label">Job Type</InputLabel>
                  <Select
                    labelId="job-type-label"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    {loading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : error ? (
                      <MenuItem disabled>{error}</MenuItem>
                    ) : (
                      jobTypes.map((jobType) => (
                        <MenuItem key={jobType._id} value={jobType._id}>
                          {jobType.jobTypeName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {"job type ID : " + jobType}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="job-time"
                    name="job-time"
                    value={jobTime}
                    onChange={(e) => setJobTime(e.target.value)}
                  >
                    <FormControlLabel
                      value="full-time"
                      control={<Radio />}
                      label="Full Time"
                    />
                    <FormControlLabel
                      value="part-time"
                      control={<Radio />}
                      label="Part Time"
                    />
                    <FormControlLabel
                      value="both"
                      control={<Radio />}
                      label="Both"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Add Job
              </Button>
            </form>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyJobAdd;
