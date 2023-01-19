import { Alert, Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import userApi from '../../../../api/modules/userApi';
import { setAuthModalOpen } from '../../../../redux/features/authModalSlice';
import { setUser } from '../../../../redux/features/userSlice';
import SignButton from '../SignButton';
import SigninList from './SigninList';
import singinFormValues from './singinFormValues';

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    ...singinFormValues,
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, error } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Signed in successful');
      }

      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <SigninList signinForm={signinForm} />

      <SignButton isLoginRequest={isLoginRequest} title="sign in" />

      <Button
        fullWidth
        sx={{ marginTop: '1rem' }}
        onClick={() => switchAuthState()}
      >
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;
