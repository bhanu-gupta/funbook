import { connect } from 'react-redux';
import { login } from '../../actions/auth_actions';
import LoginForm from './login_form';
import { getAllAuthErrors } from '../../util/selector';

const msp = (state) => {
    return {
        errors: getAllAuthErrors(state),
    };
};

const mdp = (dispatch) => {
    return {
        processForm: (loginForm) => dispatch(login(loginForm))
    };
};

export default connect(msp, mdp)(LoginForm);