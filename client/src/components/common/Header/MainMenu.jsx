import { Box, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import menuConfigs from '../../../configs/menuConfigs';
import { themeModes } from '../../../configs/themeConfigs';
import Logo from '../Logo';
import { useSelector } from 'react-redux';

const MainMenu = ({ onSwitchTheme, themeMode }) => {
  const { appState } = useSelector((state) => state.appState);

  return (
    <Box flexGrow={1} alignItems="center" display={{ xs: 'none', md: 'flex' }}>
      <Box sx={{ marginRight: '30px' }}>
        <Logo />
      </Box>
      {menuConfigs.main.map((item, index) => (
        <Button
          key={index}
          sx={{
            color: 'inherit',
            mr: 2,
          }}
          component={Link}
          to={item.path}
          variant={appState.includes(item.state) ? 'contained' : 'text'}
        >
          {item.display}
        </Button>
      ))}
      <IconButton sx={{ color: 'inherit' }} onClick={onSwitchTheme}>
        {/* {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />} */}
        {themeMode === themeModes.dark && <Brightness7Icon />}
        {themeMode === themeModes.light && <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default MainMenu;
