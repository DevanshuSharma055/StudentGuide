import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupUserRequest } from "../../Services/UserApiCall"; // Assuming you have this API call
import { useNavigate } from "react-router-dom";

// Yup validation schema for signup
const signupValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
    Name: Yup.string().required("Please confirm your password"),
});

// Initial form values
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  Name:""
};

// Custom TextField component for Formik
const FormikTextField: React.FC<any> = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;

  return (
    <TextField
      {...field}
      {...props}
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );
};

const SignupScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      // Remove confirmPassword from the payload since it's only for validation
      const { confirmPassword, ...signupData } = values;

      const data = await signupUserRequest(signupData);
      if (!data?.success) {
        toast.error(data.message || "Signup failed");
        return;
      }
      // dispatch(setUserAuth(true));
      navigate('/')
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        toast.error(errorMessage);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  name="Name"
                  component={FormikTextField}
                  fullWidth
                  label="User Name"
                  variant="outlined"
                  type="text"
                  placeholder="Enter Your Name"
                  // required
                />
                <Field
                  name="email"
                  component={FormikTextField}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email"
                  // required
                />

                <Field
                  name="password"
                  component={FormikTextField}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  placeholder="Enter your password"
                  // required
                />

                <Field
                  name="confirmPassword"
                  component={FormikTextField}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  placeholder="Re-enter your password"
                  // required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.03)",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      transform: "none",
                    },
                  }}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{" "}
          <Link href="/" underline="hover" color="primary">
            Login
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignupScreen;
