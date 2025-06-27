import React, { useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  sendOtpToEmail,
  userLogOutRequest,
  verifyEmail,
  verifyOtp,
} from "../Services/UserApiCall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../Store/UserSlice";
import { toast } from "react-toastify";
import { CircularLoader } from "./Loader";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const user = useSelector((state: any) => state.user.userAuth);
  const [openDialog, setopenDialog] = useState(false);
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const response = await userLogOutRequest();
      if (response?.status === 200) {
        dispatch(setUserAuth(false));
        navigate("/login"); // Redirect to login
        toast.success(response?.data?.message || "Logged out successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const handleOtpVerify = async () => {
    const reqData = {
      otp: otp,
      email: userData.email,
    };
    try {
      const res = await verifyOtp(reqData);
      if (res.success) {
        const reqData = {
          email: userData.email,
        };
        const resverifyEmail = await verifyEmail(reqData);
        toast.success(resverifyEmail?.message);
        setopenDialog(false);
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

  const handleProfile = async () => {
    setLoading(true);
    const reqData = { email: userData.email };
    try {
      const res = await sendOtpToEmail(reqData);
      if (res?.success) {
        toast.success(res?.message);
        setopenDialog(true);
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
      handleClose();
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: "10px 20px",
        backgroundColor: "#1E1E2F ",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        color:'#FFFFFF'
      }}
    >
      {/* Left - Logo */}
      <Grid>
        <Typography variant="h6" fontWeight="bold">
          Career
        </Typography>
      </Grid>

      {/* Center - Navigation */}
      {user && (
        <Grid>
          <Grid container spacing={4} justifyContent="center">
            <Grid>
              <Typography
                variant="h6"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/home")}
              >
                Home
              </Typography>
            </Grid>
            <Grid>
              <Typography
                variant="h6"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/home/about")}
              >
                About
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Right - Avatar */}
      {user && (
        <Grid>
          <Avatar
            sx={{ bgcolor: "#FFFFFF", cursor: "pointer" }}
            onClick={handleAvatarClick}
          >
            <PersonIcon style={{ color: 'black' }}/>
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* <MenuItem onClick={handleProfile}>
              {loading ? (
                <Box sx={{ mt: 1 }}>
                  <CircularLoader />
                </Box>
              ): 'Verify Email'}
              
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setopenDialog(false)}>
        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ padding: 3, minWidth: 300 }}
        >
          <Typography variant="h6" gutterBottom>
            Enter OTP
          </Typography>
          <input
            type="text"
            maxLength={6}
            onChange={(e: any) => setOtp(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            placeholder="Enter 6-digit OTP"
          />
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid>
              <button
                onClick={() => setopenDialog(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </Grid>
            <Grid>
              <button
                onClick={handleOtpVerify}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default Header;
