import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
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
import { color } from "../../Utils/UIConstant";

const LandingPage: React.FC = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Assessment fontSize="large" sx={{ color: "#6366f1" }} />,
      title: "Detailed Analysis",
      description:
        "Get insights into your skills, interests, and potential career paths.",
    },
    {
      icon: <TrendingUp fontSize="large" sx={{ color: "#06b6d4" }} />,
      title: "Growth Opportunities",
      description:
        "Discover emerging careers and future-ready skills in your industry.",
    },
    {
      icon: <WorkOutline fontSize="large" sx={{ color: "#10b981" }} />,
      title: "Industry Insights",
      description:
        "Explore job market trends, salary data, and career progression.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: color.PrimaryBackgroud, color: "white", py: 8 }}>
      <Container maxWidth="md">
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome, {userData.name}!
          </Typography>
          <Typography variant="h6" sx={{ color: "#d1d5db", mb: 3 }}>
            Unlock your career potential with personalized insights and expert recommendations.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
            <Chip label="Personalized" variant="outlined" sx={{ color: "white", borderColor: "#4b5563" }} />
            <Chip label="Data-Driven" variant="outlined" sx={{ color: "white", borderColor: "#4b5563" }} />
            <Chip label="Expert Insights" variant="outlined" sx={{ color: "white", borderColor: "#4b5563" }} />
          </Stack>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: color.PrimaryBtnColor,
              color: "black",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: color.PrimaryBtnHoverColor,
              },
            }}
            onClick={() => navigate("/home/question")}
          >
            Get Started Now
          </Button>
        </Box>

        {/* Quick Info */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={6}>
          <Person fontSize="small" sx={{ mr: 1, color: "#9ca3af" }} />
          <Typography variant="body2" color="#9ca3af">
            Takes only 5–10 minutes to complete
          </Typography>
        </Box>

        {/* Features */}
        <Typography variant="h4" align="center" fontWeight={700} mb={4}>
          What You'll Get
        </Typography>

        <Grid spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index}  sx={{marginTop:'2px'}}>
              <Card
                sx={{
                  height: "100%",
                  color:'#ffffff ',
                  borderRadius: 2,
                  p: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                  backgroundColor:'#2C2C3E'
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="#ffffff '">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
