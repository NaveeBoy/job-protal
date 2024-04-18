import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Validation schema using Yup
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  role: yup.string().required("User Type is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const notifySuccess = () => toast.success("Data sent successfully!");
  const notifyError = () => toast.error("Failed to send data or Email already exists. Please use a different email and Please try again.");
  const notifyEmailExists = () => toast.error("Email already exists. Please use a different email.");

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:9000/api/check-email?email=${email}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const collectData = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        notifyEmailExists();
      } else {
        const result = await fetch("http://localhost:9000/api/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.ok) {
          notifySuccess();
          localStorage.setItem("user", JSON.stringify(values));
          resetForm(); // Reset the form
        } else {
          notifyError();
        }
      }
    } catch (error) {
      notifyError();
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      collectData(values, { resetForm });
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "105vh",
            marginTop: "0.1rem",
            marginBottom: "3rem",
            opacity: "",
            marginRight: "7rem",
            marginLeft: "7rem",
            width: "50%",
            justifyContent: "center",
          }}
        >
          {/* Your JSX content */}
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
          onSubmit={formik.handleSubmit}
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
              <h2 className="text-primary">Welcome to Quick Jobs</h2>
            </div>
            <br />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="First Name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            {/*dropdown*/}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="role-label">User Type</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                label="User Type"
              >
                <MenuItem value="">
                  <em>Select User Type</em>
                </MenuItem>
                <MenuItem value={"0"}>Job Seeker</MenuItem>
                <MenuItem value={"2"}>Company</MenuItem>
              </Select>
            </FormControl>
            {/*dropdown*/}

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="E-mail"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label="Confirm Password"
              type="password"
              id="cpassword"
              name="cpassword"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
              helperText={formik.touched.cpassword && formik.errors.cpassword}
            />

            <Button fullWidth variant="contained" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Signup;
