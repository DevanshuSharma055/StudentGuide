import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  sendOtpToEmail,
  updatePassword,
  verifyOtp,
} from "../../Services/UserApiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularLoader } from "../../Components/Loader";

// Validation Schemas
const EmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const OtpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ForgetPassword: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (values: { email: string }) => {
    setLoading(true);
    const reqData = { email: values.email };
    try {
      const res = await sendOtpToEmail(reqData);
      if (res?.success) {
        setStep(2);
        setEmail(values.email);
        toast.success(res?.message);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        toast.error(errorMessage);
      } else {
        toast.error("Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (values: { otp: string }) => {
    // After OTP verification
    const reqData = {
      otp: values.otp,
      email: email,
    };
    try {
      const res = await verifyOtp(reqData);
      if (res.success) {
        setStep(3);
        toast.success(res?.message);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        toast.error(errorMessage);
      } else {
        toast.error("Please try again.");
      }
    }
  };

  const handlePasswordSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const reqData = {
      email,
      newPassword: values.password,
    };

    try {
      const res = await updatePassword(reqData);
      console.log("otp res", res);
      if (res.success) {
        toast.success(res?.message);
        navigate("/");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          `Error: ${error.response.status}`;
        toast.error(errorMessage);
      } else {
        toast.error("Please try again.");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
        {step === 1 && (
          <>
            <Typography variant="h6" mb={2}>
              Enter Email
            </Typography>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={EmailSchema}
              onSubmit={handleEmailSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Email"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Button type="submit" fullWidth variant="contained">
                    {loading ? (
                      <Box sx={{ mt: 1 }}>
                        <CircularLoader />
                      </Box>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h6" mb={2}>
              Enter OTP
            </Typography>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={OtpSchema}
              onSubmit={handleOtpSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="otp"
                    label="OTP"
                    margin="normal"
                    type="number"
                    error={touched.otp && Boolean(errors.otp)}
                    helperText={touched.otp && errors.otp}
                  />
                  <Button type="submit" fullWidth variant="contained">
                    Submit OTP
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {step === 3 && (
          <>
            <Typography variant="h6" mb={2}>
              Reset Password
            </Typography>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={PasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <Button type="submit" fullWidth variant="contained">
                    Update Password
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
