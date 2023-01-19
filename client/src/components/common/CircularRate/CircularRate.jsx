import { Box, Typography, CircularProgress } from '@mui/material';
import uiCircularRate from './uiCircularRate';

const CircularRate = ({ value }) => {
  return (
    <Box sx={{ ...uiCircularRate.mainBox }}>
      <CircularProgress
        variant="determinate"
        value={value * 10}
        color="success"
        size={50}
      />
      <Box sx={{ ...uiCircularRate.innerBox }}>
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{
            marginTop: '-5px',
          }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
