// SignUpForm.js

//import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:9000/api/signup", {
      method: "post",
      body: JSON.stringify({ firstName, lastName, email, password, role }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json;
    localStorage.setItem("users", JSON.stringify(result));
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor:'#ACE2E1',
        }}
      >
        <Box
          sx={{
            height: "105vh",
            marginTop: "3rem",
            marginBottom: "3rem",
            opacity: "",
            marginRight: "7rem",
            marginLeft: "7rem",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <div className="text-align">
            <p>
              Please fill in the information below to create an account with
              Quck Jobs. Once your account has been created, you can login at
              any time and use your own Workspace in the system. From this
              workspace, you can apply for jobs, upload your CV, search for
              vacancies, see your list of applied jobs, and most importantly be
              given feedback on the progress of your vacancy applications.
            </p>
          </div>
          <br />
          <br />

          <div className="text-align">
            <p>
              Please try to use strong credentials (Password). Strong
              credentials should have a minimum of 8 characters, with a mix of
              upper/lower case letters and numbers. We encourage you to use your
              email address as your user name.{" "}
            </p>
          </div>
          <div className="m-10">
            <img src="./logo.jpg" width={200} />
          </div>
        </Box>
        <Box
          sx={{
            marginTop: "3rem",
            marginBottom: "3rem",
            opacity: "",
            marginRight: "7rem",
          }}
          onSubmit={collectData}
          component="form"
          className="form_style border-style "
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <h2 class="text-primary ">Welcome to Quck Jobs</h2>
            </div>
            <br />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="First Name"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="First Name"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Last Name"
              id="lasttName"
              name="lasttName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Last Name"
            />
            {/*dropdown*/}
            <label className="text-left">Select User Type</label>
            <Select
              sx={{ mb: 3 }}
              fullWidth
              labelId="role"
              id="role"
              label="User Type"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="">
                <em>Select User Type</em>
              </MenuItem>
              <MenuItem value={"0"}>Job Seaker</MenuItem>
              <MenuItem value={"2"}>Company</MenuItem>
            </Select>
            {/*dropdown*/}

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="E-mail"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Confirm Password"
              id="cpassword"
              name="cpassword"
              type="cpassword"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Confirm Password"
            />

            <Button fullWidth variant="contained" type="submit">
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Signup;
