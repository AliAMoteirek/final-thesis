import { Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.user);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <MenuItem anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
      )}
    </>
  );
};

export default UserMenu;
