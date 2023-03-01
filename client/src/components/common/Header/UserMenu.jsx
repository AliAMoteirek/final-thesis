import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextAvatar from '../TextAvatar/TextAvatar';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.user);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              alignItems: 'center',
              alignContent: 'center',
            }}
            onClick={toggleMenu}
          >
            <TextAvatar text={user.displayName} />
            <Box sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <MenuItem anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
      )}
    </>
  );
};

export default UserMenu;
