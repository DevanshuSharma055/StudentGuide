import {
  CircularProgress,
  Box} from '@mui/material';

export const CircularLoader = ({ 
  size = 20, 
  thickness = 1.6,
  className = '',
  ...props 
}) => {
  return (
    <Box className={className} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress 
        size={size} 
        sx={{ color: 'black' }} 
        thickness={thickness}
        {...props}
      />
    </Box>
  );
};