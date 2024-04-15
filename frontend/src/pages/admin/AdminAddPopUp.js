import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const AdminAddPopUp = () => {
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const [firstName, seFtName] = useState("");
  const [lastName, seLtName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:9000/api/signup", {
      method: "post",
      body: JSON.stringify({ firstName, lastName, email, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json;
    localStorage.setItem("user", JSON.stringify(result));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={functionopenpopup} color="success" variant="contained">
        + Create Admin
      </Button>
      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Create New Admin{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          {/* <Stack spacing={2} margin={2}>
                      <TextField variant="outlined" label="First Name"></TextField>
                      <TextField variant="outlined" label="Last Name"></TextField>
                      <TextField variant="outlined" label="E-Mail"></TextField>
                      <TextField variant="outlined" label="Password"></TextField>
                      <TextField variant="outlined" label="Confirm Password"></TextField>
                      <TextField variant="outlined" label="User Type : Admin" disabled='true' value="Admin" ></TextField>
                      
                      <Button color="primary" variant="contained" type="submit">Create</Button>
                    </Stack> */}

          <div className="container">
            <form onSubmit={collectData}>
              {/* <h1 className="text-center pt-3">SIGNUP FORM</h1> */}
              <div className="mb-3 mt-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => seFtName(e.target.value)}
                />
              </div>
              <div className="mb-3 mt-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => seLtName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={Cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <button type="submit" className=" btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminAddPopUp;
