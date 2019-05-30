import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/auth_actions';
import LoginForm from './login_form';
import {withRouter} from 'react-router-dom';

const mdp = (dispatch) => {
    return {
        login: (loginForm) => dispatch(login(loginForm)),
        clearErrors: () => dispatch(clearErrors())
    };
};

export default withRouter(connect(null, mdp)(LoginForm));