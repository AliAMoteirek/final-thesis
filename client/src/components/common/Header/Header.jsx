import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Stack, Toolbar } from '@mui/material';
import { themeModes } from '../../../configs/themeConfigs';
import { setAuthModalOpen } from '../../../redux/features/authModalSlice';
import { setThemeMode } from '../../../redux/features/themeModeSlice';
import ScrollAppBar from '../ScrollAppBar';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';
import ToogleSidebar from './Sidebar/ToogleSidebar';
import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <ToogleSidebar toggleSidebar={toggleSidebar} />
            <MainMenu onSwitchTheme={onSwitchTheme} themeMode={themeMode} />

            {/* user menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Header;
