import { Stack, TextField } from '@mui/material';

const SignupList = ({ signupForm }) => {
  return (
    <Stack spacing={3}>
      <TextField
        type="text"
        placeholder="username"
        name="username"
        fullWidth
        value={signupForm.values.username}
        onChange={signupForm.handleChange}
        color="success"
        error={
          signupForm.touched.username &&
          signupForm.errors.username !== undefined
        }
        helperText={signupForm.touched.username && signupForm.errors.username}
      />
      <TextField
        type="text"
        placeholder="display name"
        name="displayName"
        fullWidth
        value={signupForm.values.displayName}
        onChange={signupForm.handleChange}
        color="success"
        error={
          signupForm.touched.displayName &&
          signupForm.errors.displayName !== undefined
        }
        helperText={
          signupForm.touched.displayName && signupForm.errors.displayName
        }
      />
      <TextField
        type="password"
        placeholder="password"
        name="password"
        fullWidth
        value={signupForm.values.password}
        onChange={signupForm.handleChange}
        color="success"
        error={
          signupForm.touched.password &&
          signupForm.errors.password !== undefined
        }
        helperText={signupForm.touched.password && signupForm.errors.password}
      />
      <TextField
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        fullWidth
        value={signupForm.values.confirmPassword}
        onChange={signupForm.handleChange}
        color="success"
        error={
          signupForm.touched.confirmPassword &&
          signupForm.errors.confirmPassword !== undefined
        }
        helperText={
          signupForm.touched.confirmPassword &&
          signupForm.errors.confirmPassword
        }
      />
    </Stack>
  );
};

export default SignupList;
