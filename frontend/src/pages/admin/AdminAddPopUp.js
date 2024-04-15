import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
  });

const AdminAddPopUp = () => {
    const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

    const [firstName,setfirstName]= useState("");
  const [lastName,setlastName]= useState("");
  const [role,setRole]= useState("");
  const [email,setemail]= useState("");
  const [password,setpassword]= useState("");

  const collectData = async(e) =>{
    e.preventDefault();
    let result = await fetch('http://localhost:9000/api/signup',{
      method:"post",
      body:JSON.stringify({firstName,lastName,email,password,role}),
      headers:{
        'Content-Type':'application/json',
      }
    });
    result = await result .json;
    localStorage.setItem("users",JSON.stringify(result));
  }


    return (
        <div style={{textAlign:'center'}}>
            
            <Button onClick={functionopenpopup} color="success" variant="contained">+ Create Admin</Button>
            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Create New Admin  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent >
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2}>
                      <TextField variant="outlined" label="First Name" id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e)=> setfirstName(e.target.value)}></TextField>
                      <TextField variant="outlined" label="Last Name" id="lasttName"
              name="lasttName"
              value={lastName}
              onChange={(e)=> setlastName(e.target.value)}></TextField>
                      <TextField variant="outlined" label="E-Mail" id="email"
              name="email"
              value={email}
              onChange={(e)=> setemail(e.target.value)}></TextField>
                      <TextField variant="outlined" label="Password" type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=> setpassword(e.target.value)}></TextField>
                      <TextField variant="outlined" label="Confirm Password" id="cpassword"
              name="cpassword"
              type="cpassword"></TextField>
                      <TextField variant="outlined" label="User Type : Admin" disabled='true' value="Admin" ></TextField>
                      
                      <Button color="primary" variant="contained">Create</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdminAddPopUp;