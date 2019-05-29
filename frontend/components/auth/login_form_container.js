import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/auth_actions';
import LoginForm from './login_form';

const msp = (state) => {
    return {
        errors: state.errors.login,
    };
};

const mdp = (dispatch) => {
    return {
        login: (loginForm) => dispatch(login(loginForm)),
        clearErrors: () => dispatch(clearErrors())
    };
};

export default connect(msp, mdp)(LoginForm);