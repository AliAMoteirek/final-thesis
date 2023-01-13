import { Box, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Logo';

const ToogleSidebar = ({ toggleSidebar }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton
        color="inherit"
        sx={{
          mr: 2,
          display: { md: 'none' },
        }}
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
        <Logo />
      </Box>
    </Stack>
  );
};

export default ToogleSidebar;
