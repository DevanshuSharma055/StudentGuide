import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import {
  TrendingUp,
  Person,
  Assessment,
  WorkOutline,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const navigate = useNavigate()
  const features = [
    {
      icon: <Assessment sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Detailed Analysis",
      description:
        "Get comprehensive insights into your skills, interests, and career potential",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Growth Opportunities",
      description:
        "Discover emerging career paths and future-ready skills in your field",
    },
    {
      icon: <WorkOutline sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Industry Insights",
      description:
        "Access real-world data about job markets, salaries, and career progression",
    },
  ];

  return (
    <Box
      sx={{
       background: 'linear-gradient(135deg,rgb(15, 15, 15) 0%,rgb(90, 72, 72) 100%)',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 3,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Welcome, {userData.name}! 🎯
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Unlock your career potential with our comprehensive guide. Get
            personalized insights and actionable recommendations.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Chip
              label="Personalized"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
            <Chip
              label="Data-Driven"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
            <Chip
              label="Expert Insights"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          </Stack>
        </Box>

        {/* Main CTA Card */}
        <Paper
          elevation={12}
          sx={{
            p: 6,
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#1a202c" }}
              >
                Ready to Shape Your Future?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#4a5568", mb: 3, fontSize: "1.1rem" }}
              >
                Fill in your details and receive a comprehensive career guide
                report tailored to your unique profile, skills, and aspirations.
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Person sx={{ color: "#1976d2" }} />
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  Takes only 5-10 minutes to complete
                </Typography>
              </Box>
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 3,
                  background:
                    "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)",
                    background:
                      "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                  },
                }}
                onClick={()=>navigate('/home/question')}
              >
                Get Started Now
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "white",
            mb: 6,
            fontWeight: "bold",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          What You'll Get
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                    background: "rgba(255,255,255,1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#1a202c" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#4a5568", lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bottom CTA Section */}
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Don't Wait - Your Dream Career Awaits
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.9)", mb: 4 }}
          >
            Join thousands who have already discovered their ideal career path
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              py: 2,
              px: 4,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 3,
              borderColor: "white",
              color: "white",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "white",
                color: "#1976d2",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255,255,255,0.3)",
              },
            }}
          >
            Start Your Journey
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
