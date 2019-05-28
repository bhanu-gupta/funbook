import { connect } from 'react-redux';
import { login } from '../../actions/auth_actions';
import LoginForm from './login_form';

const msp = (state) => {
    return {
        errors: state.errors.auth,
    };
};

const mdp = (dispatch) => {
    return {
        processForm: (loginForm) => dispatch(login(loginForm))
    };
};

export default connect(msp, mdp)(LoginForm);