import { Stack, TextField } from '@mui/material';

const SigninList = ({ signinForm }) => {
  return (
    <Stack spacing={3}>
      <TextField
        type="text"
        placeholder="username"
        name="username"
        fullWidth
        value={signinForm.values.username}
        onChange={signinForm.handleChange}
        color="success"
        error={
          signinForm.touched.username &&
          signinForm.errors.username !== undefined
        }
        helperText={signinForm.touched.username && signinForm.errors.username}
      />
      <TextField
        type="password"
        placeholder="password"
        name="password"
        fullWidth
        value={signinForm.values.password}
        onChange={signinForm.handleChange}
        color="success"
        error={
          signinForm.touched.password &&
          signinForm.errors.password !== undefined
        }
        helperText={signinForm.touched.password && signinForm.errors.password}
      />
    </Stack>
  );
};

export default SigninList;
