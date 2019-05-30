import { connect } from 'react-redux';
import { login } from '../../actions/auth_actions';
import LoginForm from './login_form';
import {withRouter} from 'react-router-dom';

const mdp = (dispatch) => {
    return {
        login: (loginForm) => dispatch(login(loginForm))
    };
};

export default withRouter(connect(null, mdp)(LoginForm));