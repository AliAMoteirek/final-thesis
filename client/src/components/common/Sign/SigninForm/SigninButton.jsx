import { LoadingButton } from '@mui/lab';

const SigninButton = ({ isLoginRequest }) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      size="large"
      variant="contained"
      sx={{ marginTop: 4 }}
      loading={isLoginRequest}
    >
      sign in
    </LoadingButton>
  );
};

export default SigninButton;
