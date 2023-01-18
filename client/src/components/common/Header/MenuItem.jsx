import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import menuConfigs from '../../../configs/menuConfigs';
import { setUser } from '../../../redux/features/userSlice';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const MenuItem = ({ anchorEl, setAnchorEl }) => {
  const dispatch = useDispatch();
  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      PaperProps={{ sx: { padding: 0 } }}
    >
      {menuConfigs.user.map((item, index) => (
        <ListItemButton
          component={Link}
          to={item.path}
          key={index}
          onClick={() => setAnchorEl(null)}
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
      <ListItemButton
        sx={{ borderRadius: '10px' }}
        onClick={() => dispatch(setUser(null))}
      >
        <ListItemIcon>
          <LogoutOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography textTransform="uppercase">sign out</Typography>}
        />
      </ListItemButton>
    </Menu>
  );
};

export default MenuItem;
