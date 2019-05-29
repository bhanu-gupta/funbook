import { connect } from 'react-redux';
import { signup, clearErrors } from '../../actions/auth_actions';
import SignupForm from './signup_form';

const msp = (state) => {
    return {
        errors: state.errors.signup,
    };
};

const mdp = (dispatch) => {
    return {
        signup: (signupForm) => dispatch(signup(signupForm)),
        clearErrors: () => dispatch(clearErrors())
    };
};

export default connect(msp, mdp)(SignupForm);