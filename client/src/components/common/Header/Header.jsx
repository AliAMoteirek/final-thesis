import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar } from '@mui/material';
import { themeModes } from '../../../configs/themeConfigs';
import { setThemeMode } from '../../../redux/features/themeModeSlice';
import ScrollAppBar from '../ScrollAppBar';
import MainMenu from './MainMenu';

const Header = () => {
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
            <MainMenu onSwitchTheme={onSwitchTheme} themeMode={themeMode} />

            {/* user menu */}
            {/* user menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Header;
