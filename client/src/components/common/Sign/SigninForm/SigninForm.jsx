import { Alert, Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../../../api/modules/userApi';
import { setAuthModalOpen } from '../../../../redux/features/authModalSlice';
import { setUser } from '../../../../redux/features/userSlice';
import SigninButton from './SigninButton';
import SigninList from './SigninList';

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Username must be at least 8 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
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

      <SigninButton isLoginRequest={isLoginRequest} />

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
