import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  GitHub,
  Twitter,
} from "@mui/icons-material";

const AboutPage = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        We are passionate developers building modern and scalable web
        applications. Our mission is to deliver top-notch tech solutions to solve real-world problems.
      </Typography>

      {/* Team Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 4 }}>
            <Avatar
              alt="John Doe"
              // src="https://i.pravatar.cc/300"
              sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6">Devanshu Sharma</Typography>
            <Typography variant="body2" color="text.secondary">
              Full Stack Developer
            </Typography>
            {/* <Box sx={{ mt: 1 }}>
              <IconButton href="https://github.com" target="_blank" color="primary">
                <GitHub />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="primary">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="primary">
                <Twitter />
              </IconButton>
            </Box> */}
          </Paper>
        </Grid>

        {/* Add more team members as needed */}
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* Social Media Section */}
      <Typography variant="h4" align="center" gutterBottom>
        Connect With Us
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <IconButton href="https://facebook.com" target="_blank" color="primary">
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#E1306C" }}>
          <Instagram fontSize="large" />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#0072b1" }}>
          <LinkedIn fontSize="large" />
        </IconButton>
        <IconButton href="https://github.com" target="_blank" sx={{ color: "black" }}>
          <GitHub fontSize="large" />
        </IconButton>
      </Box>

      {/* Footer Note */}
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 6 }}>
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </Typography>
    </Box>
  );
};

export default AboutPage;
 