import * as Yup from 'yup';

const singupFormValues = {
  initialValues: {
    password: '',
    confirmPassword: '',
    displayName: '',
    username: '',
  },
  validationSchema: Yup.object({
    username: Yup.string()
      .min(8, 'Username must be at least 8 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'confirmPassword does not match')
      .min(8, 'confirmPassword must be at least 8 characters')
      .required('confirmPassword is required'),
    displayName: Yup.string()
      .min(8, 'displayName must be at least 8 characters')
      .required('displayName is required'),
  }),
};

export default singupFormValues;
