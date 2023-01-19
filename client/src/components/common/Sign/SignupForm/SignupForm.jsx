import { Alert, Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import userApi from '../../../../api/modules/userApi';
import { setAuthModalOpen } from '../../../../redux/features/authModalSlice';
import { setUser } from '../../../../redux/features/userSlice';
import SignButton from '../SignButton';
import singupFormValues from './signupFormValues';
import SignupList from './SignupList';

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    ...singupFormValues,
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, error } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Signed in successfully');
      }

      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <SignupList signupForm={signupForm} />

      <SignButton isLoginRequest={isLoginRequest} title="sign up" />

      <Button
        fullWidth
        sx={{ marginTop: '1rem' }}
        onClick={() => switchAuthState()}
      >
        sign in
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

export default SignupForm;
