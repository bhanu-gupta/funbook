import { connect } from 'react-redux';
import MainNav from './main_nav';
import { logout} from '../actions/auth_actions';
import {withRouter} from 'react-router-dom';

const msp = state => {
    const currentUserId = state.session.currentUserId;
    return {
        currentUser: state.entities.users[currentUserId]
    };
};

const mdp = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(msp, mdp)(MainNav));