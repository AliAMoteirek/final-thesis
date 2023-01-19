import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import passwordUpdateFormValues from './passwordUpdateFormValues';
import userApi from '../../../api/modules/userApi';
import { toast } from 'react-toastify';
import { setUser } from '../../../redux/features/userSlice';
import { setAuthModalOpen } from '../../../redux/features/authModalSlice';
import { Box, Stack, TextField } from '@mui/material';
import uiConfigs from '../../../configs/uiConfigs';
import Container from '../Container';
import { LoadingButton } from '@mui/lab';

const PasswordUpdateForm = () => {
  const [onRequest, setOnRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    ...passwordUpdateFormValues,
    onSubmit: async (values) => onUpdate(values),
  });

  const onUpdate = async (values) => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await userApi.passwordUpdate(values);

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      form.resetForm();
      navigate('/');
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success('Successfully updated your password! Please re-login');
    }
  };

  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
      }}
    >
      <Container header="update your password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="new password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder="confirm new password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdateForm;
