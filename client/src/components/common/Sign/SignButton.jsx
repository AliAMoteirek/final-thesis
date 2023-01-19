import { LoadingButton } from '@mui/lab';

const SignButton = ({ title, isLoginRequest }) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      size="large"
      variant="contained"
      sx={{ marginTop: 4 }}
      loading={isLoginRequest}
    >
      {title}
    </LoadingButton>
  );
};

export default SignButton;
