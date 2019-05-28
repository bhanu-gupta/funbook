import { connect } from 'react-redux';
import { signup } from '../../actions/auth_actions';
import SignupForm from './signup_form';
import { getAllAuthErrors } from '../../util/selector';

const msp = (state) => {
    return {
        errors: getAllAuthErrors(state),
    };
};

const mdp = (dispatch) => {
    return {
        processForm: (signupForm) => dispatch(signup(signupForm))
    };
};

export default connect(msp, mdp)(SignupForm);