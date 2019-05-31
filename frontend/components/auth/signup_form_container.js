import { connect } from 'react-redux';
import { signup, clearErrors, login } from '../../actions/auth_actions';
import SignupForm from './signup_form';

const msp = (state) => {
    return {
        errors: state.errors.signup,
    };
};

const mdp = (dispatch) => {
    const demoLoginForm = {
        email: 'test_user@test.com',
        password: '123456'
    }
    return {
        signup: (signupForm) => dispatch(signup(signupForm)),
        clearErrors: () => dispatch(clearErrors()),
        demoLogin: () => dispatch(login(demoLoginForm))
    };
};

export default connect(msp, mdp)(SignupForm);