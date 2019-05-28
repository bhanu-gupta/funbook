import { connect } from 'react-redux';
import { signup } from '../../actions/auth_actions';
import SignupForm from './signup_form';

const msp = (state) => {
    return {
        errors: state.errors.auth,
    };
};

const mdp = (dispatch) => {
    return {
        processForm: (signupForm) => dispatch(signup(signupForm)),
    };
};

export default connect(msp, mdp)(SignupForm);