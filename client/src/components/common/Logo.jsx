import { Box, Typography, useTheme } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Logo = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <PlayCircleIcon
        sx={{ transform: 'scale(1.8)', color: theme.palette.primary.main }}
      />
      <Typography fontWeight="700" fontSize="1.7rem" padding={2}>
        Movie<span style={{ color: theme.palette.primary.main }}>House</span>
      </Typography>
    </Box>
  );
};

export default Logo;
