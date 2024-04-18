import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAddPopUp = () => {
  const [open, setOpen] = useState(false);
  
  const [jobTypeName, setCName] = useState("");
  const [CCName, setCCName] = useState("");

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  

  const collectData = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if ( !jobTypeName || !CCName) {
      toast.error('All fields are required');
      return;
    }


    // Check if password and confirm password match
    if (jobTypeName !== CCName) {
      toast.error('Catrgory Name do not match');
      return;
    }

    try {
     
      const response = await fetch("http://localhost:9000/api/type/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTypeName }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      localStorage.setItem("jobType", JSON.stringify(data));
      toast.success('Category Creation successfully');
      closePopup();
    } catch (error) {
      toast.error('Category Creation Failed ');
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={openPopup} color="success" variant="contained">
        + Create Category
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>Create New Category<IconButton onClick={closePopup} style={{ float: "right" }}><CloseIcon color="primary" /></IconButton></DialogTitle>
        <DialogContent>
          <div className="container">
            <form onSubmit={collectData}>
              <br/>
              <div style={{ marginBottom: '2rem' }}>
                <TextField
                  label="Category Name"
                  type="text"
                  fullWidth
                  value={jobTypeName}
                  onChange={(e) => setCName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  label="Confirm Category Name"
                  type="text"
                  fullWidth
                  value={CCName}
                  onChange={(e) => setCCName(e.target.value)}
                />
              </div>
              <Button type="submit" color="primary" variant="contained" fullWidth>
                Create Category
              </Button>
            </form>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default AdminAddPopUp;
