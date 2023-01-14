import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../../redux/features/authModalSlice';
import Logo from '../Logo';
import uiAuthModalConfigs from './uiAuthModalConfigs';

const actionState = {
  signin: 'signin',
  signup: 'signup',
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const swtichAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{ ...uiAuthModalConfigs.mainBox }}>
        <Box sx={{ ...uiAuthModalConfigs.innerBox }}>
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
