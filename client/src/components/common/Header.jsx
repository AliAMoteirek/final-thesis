import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menuConfigs';
import { themeModes } from '../../configs/themeConfigs';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import Logo from './Logo';
import ScrollAppBar from './ScrollAppBar';

const Header = () => {
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  return (
    <>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{
                  mr: 2,
                  display: { md: 'none' },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>

            {/* main menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: 'none', md: 'flex' }}
            >
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? 'primary.contrastText'
                      : 'inherit',
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? 'outlined' : 'text'}
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
            {/* main menu */}

            {/* user menu */}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Header;
