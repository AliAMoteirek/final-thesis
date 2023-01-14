import * as Yup from 'yup';

const singinFormValues = {
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
};

export default singinFormValues;
