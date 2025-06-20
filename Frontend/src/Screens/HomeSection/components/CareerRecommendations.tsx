import React from 'react';
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
  // Parse the backend text data into structured format
  const parseCareerData = (text: string): Career[] => {
    const careers: Career[] = [];
    const sections = text.split(/\*\*\d+\.\s+/).filter(section => section.trim());
    
    sections.forEach(section => {
      if (!section.trim()) return;
      
      const lines = section.split('\n').filter(line => line.trim());
      let career: Partial<Career> = {};
      
      // Extract career name from the first line
      const firstLine = lines[0];
      if (firstLine && firstLine.includes('**')) {
        career.name = firstLine.replace(/\*\*/g, '').trim();
      }
      
      // Parse each field
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('* **Field Name:**')) {
          // Already have name, skip
        } else if (trimmedLine.startsWith('* **Short Description:**')) {
          career.description = trimmedLine.replace('* **Short Description:**', '').trim();
        } else if (trimmedLine.startsWith('* **Entrance Exams:**')) {
          career.exams = trimmedLine.replace('* **Entrance Exams:**', '').trim();
        } else if (trimmedLine.startsWith('* **Estimated Cost:**')) {
          career.cost = trimmedLine.replace('* **Estimated Cost:**', '').trim();
        } else if (trimmedLine.startsWith('* **Career Growth Potential:**')) {
          career.growth = trimmedLine.replace('* **Career Growth Potential:**', '').trim();
        } else if (trimmedLine.startsWith('* **Work Nature:**')) {
          career.workNature = trimmedLine.replace('* **Work Nature:**', '').trim();
        } else if (trimmedLine.startsWith('* **Why it Fits:**')) {
          career.whyFits = trimmedLine.replace('* **Why it Fits:**', '').trim();
        }
      });
      
      // Only add if we have essential fields
      if (career.name && career.description) {
        careers.push({
          name: career.name,
          description: career.description || '',
          exams: career.exams || 'None specified',
          cost: career.cost || 'Not specified',
          growth: career.growth || 'Not specified',
          workNature: career.workNature || 'Not specified',
          whyFits: career.whyFits || ''
        });
      }
    });
    
    return careers;
  };

  const careers = parseCareerData(backendData);

  const getCostColor = (cost: string): 'success' | 'warning' | 'error' => {
    if (cost.toLowerCase().includes('low')) return 'success';
    if (cost.toLowerCase().includes('moderate')) return 'warning';
    return 'error';
  };

  const getGrowthColor = (growth: string): 'success' | 'info' | 'warning' => {
    if (growth.toLowerCase().includes('very high')) return 'success';
    if (growth.toLowerCase().includes('high')) return 'info';
    return 'warning';
  };

  const hasExamRequirement = (exams: string) => {
    return exams && 
           exams.toLowerCase() !== 'none' &&
           !exams.toLowerCase().includes('none (') && 
           !exams.toLowerCase().includes('none specified') &&
           exams.toLowerCase() !== 'not specified';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'success.main', mx: 'auto', mb: 3 }}>
            <CheckCircle sx={{ fontSize: 48 }} />
          </Avatar>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }}>
            Your Career Recommendations
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Based on your profile, here are personalized career paths that match your interests and constraints.
          </Typography>
        </Box>

        {/* Career Cards Grid */}
        <Grid spacing={3} sx={{ mb: 6 }}>
          {careers.map((career, index) => (
            <Grid key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  width: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                    sx={{ mb: 3, lineHeight: 1.7 }}
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
                        mt: 2, 
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
          <Box sx={{ space: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                • Competitive Exams:
              </Box>{' '}
              While not explicitly required for most of these, excelling in relevant certifications can significantly boost career prospects.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                • Entrepreneurship:
              </Box>{' '}
              Many of these careers provide a stepping stone to entrepreneurship. Building experience and a strong network are crucial.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
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