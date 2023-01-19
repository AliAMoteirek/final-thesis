import * as Yup from 'yup';

const passwordUpdateFormValues = {
  initialValues: {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  validationSchema: Yup.object({
    password: Yup.string()
      .min(8, 'password minimum 8 characters')
      .required('password is required'),
    newPassword: Yup.string()
      .min(8, 'newPassword minimum 8 characters')
      .required('newPassword is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'confirmNewPassword does not match')
      .min(8, 'confirmNewPassword minimum 8 characters')
      .required('confirmNewPassword is required'),
  }),
};

export default passwordUpdateFormValues;
