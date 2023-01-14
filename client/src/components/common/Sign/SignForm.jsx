import SigninForm from './SigninForm/SigninForm';
import SignupForm from './SignupForm';

const SignForm = ({ action, actionState, swtichAuthState }) => {
  return (
    <>
      {action === actionState.signin && (
        <SigninForm
          switchAuthState={() => swtichAuthState(actionState.signup)}
        />
      )}
      {action === actionState.signup && (
        <SignupForm
          switchAuthState={() => swtichAuthState(actionState.signin)}
        />
      )}
    </>
  );
};

export default SignForm;
