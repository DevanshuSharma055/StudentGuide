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
  X,
  Mail,
} from "@mui/icons-material";
import { color } from "../../Utils/UIConstant";

const AboutPage = () => {
  return (
    <Box sx={{ p: 4, bgcolor: color.PrimaryBackgroud, minHeight: "100vh", color: color.PrimaryTextColor }}>
      {/* Header */}
      <Typography variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        We are passionate developers building modern and scalable web
        applications. Our mission is to deliver top-notch tech solutions to solve real-world problems.
      </Typography>

      {/* Team Section */}
      <Grid container spacing={4} justifyContent="center" >
        <Grid>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 4, backgroundColor: color.SecBackgroudColor }}>
            <Avatar
              alt="John Doe"
              // src="https://i.pravatar.cc/300"
              sx={{ width: 100, height: 100, mx: "auto", mb: 2,color: color.SecBackgroudColor }}
            />
            <Typography variant="h6" sx={{color: color.PrimaryTextColor}}>Devanshu Sharma</Typography>
            <Typography variant="body2" sx={{color: color.PrimaryTextColor}}>
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
        <IconButton href="https://x.com/SharmaJi_KaGyan" target="_blank" sx={{ color: "#E1306C" }}>
          <X fontSize="large" />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/devanshusharma-" target="_blank" sx={{ color: "#0072b1" }}>
          <LinkedIn fontSize="large" />
        </IconButton>
        <IconButton href="https://github.com/DevanshuSharma055" target="_blank" sx={{ color: "black" }}>
          <GitHub fontSize="large" />
        </IconButton>
        <IconButton href="devanshusharma022@gmail.com" target="_blank" sx={{ color: "black" }}>
          <Mail fontSize="large"/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default AboutPage;
 