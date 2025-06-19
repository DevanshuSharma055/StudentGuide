import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

const LandingPage: React.FC = () => {
  const userData = useSelector((state: any) => state.user.userData)
  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome {userData.name}
            </Typography>
          </Grid>

          {/* <Grid>
            <Box
              component="img"
              src="https://source.unsplash.com/600x400/?technology,app"
              alt="Landing hero"
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />
          </Grid> */}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
          {[
            {
              title: 'Easy to Use',
              desc: 'Here is complete login and signup for your project',
            },
            {
              title: 'Secure & Reliable',
              desc: 'We prioritize security to protect your .data and privacy',
            },
            {
              title: '24/7 Support',
              desc: 'You can ask me any think about this page',
            },
          ].map(({ title, desc }) => (
            <Grid>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography color="text.secondary">{desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>     
    </Box>
  );
};

export default LandingPage;
