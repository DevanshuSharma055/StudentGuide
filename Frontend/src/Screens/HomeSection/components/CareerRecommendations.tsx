import React, { useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Divider,
  Avatar
} from '@mui/material';
import {
  CheckCircle,
  Work,
  TrendingUp,
  Home,
  School,
  AttachMoney,
  Star
} from '@mui/icons-material';

interface Career {
  name: string;
  description: string;
  exams: string;
  cost: string;
  growth: string;
  workNature: string;
  whyFits: string;
}

interface CareerRecommendationsProps {
  backendData: string;
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ backendData }) => {
  // Memoize the parsing to prevent unnecessary re-renders
  const careers = useMemo(() => {
  const parseCareerData = (text: string): Career[] => {
    try {
      const careers: Career[] = [];

      // Split based on headings like **1. Career Name**
      const sections = text.split(/\*\*\d+\.\s+/).filter(section => section.trim());
      console.log('Parsed Sections:', sections);
      sections.shift();
      sections.forEach((section) => {
        const lines = section.split('\n').filter(line => line.trim());
        let career: Partial<Career> = {};

        // First line is always the career name
        const nameLine = lines[0]?.trim().replace(/\*\*/g, '') || '';
        career.name = nameLine;

        // Now parse all other fields
        lines.forEach(line => {
          const trimmedLine = line.trim();

          if (trimmedLine.includes('**Brief Description:**')) {
            career.description = trimmedLine.split('**Brief Description:**')[1]?.replace(/\*\*/g, '').trim();
          } else if (trimmedLine.includes('**Why it fits Dev:**')) {
            career.whyFits = trimmedLine.split('**Why it fits Dev:**')[1]?.replace(/\*\*/g, '').trim();
          } else if (trimmedLine.includes('**Required Education/Exams:**')) {
            career.exams = trimmedLine.split('**Required Education/Exams:**')[1]?.replace(/\*\*/g, '').trim();
          } else if (trimmedLine.includes('**Estimated Cost:**')) {
            career.cost = trimmedLine.split('**Estimated Cost:**')[1]?.replace(/\*\*/g, '').trim();
          } else if (trimmedLine.includes('**Work Nature:**')) {
            career.workNature = trimmedLine.split('**Work Nature:**')[1]?.replace(/\*\*/g, '').trim();
          } else if (trimmedLine.includes('**Career Growth Potential:**')) {
            career.growth = trimmedLine.split('**Career Growth Potential:**')[1]?.replace(/\*\*/g, '').trim();
          }
        });

        if (career.name) {
          careers.push({
            name: career.name,
            description: career.description || 'No description available',
            exams: career.exams || 'None specified',
            cost: career.cost || 'Not specified',
            growth: career.growth || 'Not specified',
            workNature: career.workNature || 'Not specified',
            whyFits: career.whyFits || 'This career matches your profile based on the analysis.'
          });
        }
      });

      console.log('Parsed Careers:', careers);
      return careers;
    } catch (error) {
      console.error('Error parsing career data:', error);
      return [];
    }
  };

  return parseCareerData(backendData);
}, [backendData]);


  const getCostColor = (cost: string): 'success' | 'warning' | 'error' => {
    const lowerCost = cost.toLowerCase();
    if (lowerCost.includes('low')) return 'success';
    if (lowerCost.includes('moderate') || lowerCost.includes('medium')) return 'warning';
    return 'error';
  };

  const getGrowthColor = (growth: string): 'success' | 'info' | 'warning' => {
    const lowerGrowth = growth.toLowerCase();
    if (lowerGrowth.includes('very high') || lowerGrowth.includes('excellent')) return 'success';
    if (lowerGrowth.includes('high') || lowerGrowth.includes('good')) return 'info';
    return 'warning';
  };

  const hasExamRequirement = (exams: string) => {
    const lowerExams = exams.toLowerCase();
    return exams && 
           lowerExams !== 'none' &&
           !lowerExams.includes('none (') && 
           !lowerExams.includes('none specified') &&
           lowerExams !== 'not specified' &&
           !lowerExams.includes('no specific');
  };

  // Show loading state if no careers parsed
  if (!careers || careers.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">
            {backendData ? 'Processing career recommendations...' : 'No career data available'}
          </Typography>
          {backendData && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Please check the data format or try again.
            </Typography>
          )}
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'success.main', mx: 'auto', mb: 3 }}>
            <CheckCircle sx={{ fontSize: 48 }} />
          </Avatar>
          <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }}>
            Your Career Recommendations
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Based on your profile, here are {careers.length} personalized career paths that match your interests and constraints.
          </Typography>
        </Box>

        {/* Career Cards Grid - Fixed Grid Structure */}
        <Grid spacing={3} sx={{ mb: 6 }}>
          {careers.map((career, index) => (
            <Grid key={`career-${index}`}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                  {/* Career Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                      <Work />
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      {career.name}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ mb: 3, lineHeight: 1.7, flexGrow: 1 }}
                  >
                    {career.description}
                  </Typography>

                  {/* Key Info Chips */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        icon={<AttachMoney />}
                        label={`Cost: ${career.cost}`}
                        size="small"
                        color={getCostColor(career.cost)}
                        variant="outlined"
                        sx={{ fontWeight: 'medium' }}
                      />
                      <Chip
                        icon={<TrendingUp />}
                        label={`Growth: ${career.growth}`}
                        size="small"
                        color={getGrowthColor(career.growth)}
                        variant="outlined"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<Home />}
                        label={career.workNature}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 'medium' }}
                      />
                      {hasExamRequirement(career.exams) && (
                        <Chip
                          icon={<School />}
                          label="Exams Required"
                          size="small"
                          color="info"
                          variant="outlined"
                          sx={{ fontWeight: 'medium' }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Why it fits */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Star sx={{ fontSize: 20, color: 'warning.main', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        Why This Fits You:
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ lineHeight: 1.6 }}
                    >
                      {career.whyFits}
                    </Typography>
                  </Box>

                  {/* Exam Details (if any) */}
                  {hasExamRequirement(career.exams) && (
                    <Box 
                      sx={{ 
                        mt: 'auto',
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                          Entrance Requirements:
                        </Box>{' '}
                        {career.exams}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Important Notes */}
        <Paper 
          elevation={1}
          sx={{ 
            p: 4, 
            bgcolor: 'info.50', 
            border: '1px solid', 
            borderColor: 'info.200',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: 'info.main', fontWeight: 'bold', mb: 3 }}>
            Important Considerations
          </Typography>
          <Box sx={{ '& > *': { mb: 2 } }}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                • Competitive Exams:
              </Box>{' '}
              While not explicitly required for most of these, excelling in relevant certifications can significantly boost career prospects.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                • Entrepreneurship:
              </Box>{' '}
              Many of these careers provide a stepping stone to entrepreneurship. Building experience and a strong network are crucial.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 0 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                • Networking:
              </Box>{' '}
              Building connections within your chosen field through online communities, volunteering, or internships is vital for success.
            </Typography>
          </Box>
        </Paper>
      </Paper>
    </Container>
  );
};

export default CareerRecommendations;