import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1976d2',
        color: 'white',
        py: 2,
        textAlign: 'center',
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} YourApp. All rights reserved.{' '}
        <Link href="/privacy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
