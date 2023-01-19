import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import menuConfigs from '../../../../configs/menuConfigs';
import { themeModes } from '../../../../configs/themeConfigs';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DrawerList = ({ toggleSidebar, onSwitchTheme }) => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <List sx={{ paddingX: '30px' }}>
      <Typography variant="h6" marginBottom="20px">
        MENU
      </Typography>
      {menuConfigs.main.map((item, index) => (
        <ListItemButton
          key={index}
          sx={{
            borderRadius: '10px',
            marginY: 1,
            backgroundColor: appState.includes(item.state)
              ? 'primary.main'
              : 'unset',
          }}
          component={Link}
          to={item.path}
          onClick={() => toggleSidebar(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">{item.display}</Typography>
            }
          />
        </ListItemButton>
      ))}

      {user && (
        <>
          <Typography variant="h6" marginBottom="20px">
            PERSONAL
          </Typography>
          {menuConfigs.user.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: '10px',
                marginY: 1,
                backgroundColor: appState.includes(item.state)
                  ? 'primary.main'
                  : 'unset',
              }}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">
                    {item.display}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </>
      )}

      <Typography variant="h6" marginBottom="20px">
        THEME
      </Typography>
      <ListItemButton onClick={onSwitchTheme}>
        <ListItemIcon>
          {themeMode === themeModes.dark && <Brightness7Icon />}
          {themeMode === themeModes.light && <Brightness4Icon />}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography textTransform="uppercase">
              {themeMode === themeModes.dark ? 'dark mode' : 'light mode'}
            </Typography>
          }
        />
      </ListItemButton>
    </List>
  );
};

export default DrawerList;
