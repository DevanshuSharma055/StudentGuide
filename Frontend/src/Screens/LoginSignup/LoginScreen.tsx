import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { googleAuth, loginUserRequest } from "../../Services/UserApiCall";
import { useDispatch } from "react-redux";
import { setUserAuth, setUserData } from "../../Store/UserSlice";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// Yup validation schema
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

// Custom TextField component for Formik
const FormikTextField: React.FC<any> = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  const dispatch = useDispatch();

  return (
    <TextField
      {...field}
      {...props}
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );
};

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      const data = await loginUserRequest(values);
      if (data?.status === 200) {
        dispatch(setUserAuth(true));
        toast.success(data?.data?.message);
        dispatch(setUserData(data?.data?.userData));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } finally {
      // setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await googleAuth(credentialResponse.credential);
      if (res?.status === 200) {
        toast.success(res.data?.message || "Google Login Successful");
        dispatch(setUserAuth(true));
        dispatch(setUserData(res.data?.userData));
      }
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
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
      <Paper elevation={6} sx={{ padding: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

                <Grid container justifyContent="flex-end">
                  <Link
                    href="/forgot-password"
                    underline="hover"
                    variant="body2"
                    color="primary"
                  >
                    Forgot Password?
                  </Link>
                </Grid>

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
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Grid container justifyContent="center">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <Box display="flex" alignItems="center" gap={1}>
              {/* <Google color="action" /> */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
              />
            </Box>
          </GoogleOAuthProvider>
        </Grid>

        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <Link href="/signup" underline="hover" color="primary">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginScreen;
