import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAddPopUp = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const collectData = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    // Check if password is at least 8 characters
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      toast.success('Admin Creation successfully');
      closePopup();
    } catch (error) {
      toast.error('Admin Creation Failed ');
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={openPopup} color="success" variant="contained">
        + Create Admin
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>Create New Admin<IconButton onClick={closePopup} style={{ float: "right" }}><CloseIcon color="primary" /></IconButton></DialogTitle>
        <DialogContent>
          <div className="container">
            <br/>
            <form onSubmit={collectData}>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" color="primary" variant="contained" fullWidth>
                Create Admin
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
