import { Drawer, Stack, Toolbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../Logo';
import uiConfigs from '../../../../configs/uiConfigs';
import { themeModes } from '../../../../configs/themeConfigs';
import { setThemeMode } from '../../../../redux/features/themeModeSlice';
import DrawerList from './DrawerList';

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <DrawerList onSwitchTheme={onSwitchTheme} toggleSidebar={toggleSidebar} />
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        '& .MuiDrawer-Paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          borderRight: '0px',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
