import { connect } from 'react-redux';
import MainNav from './main_nav';
import { logout} from '../actions/auth_actions';

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

export default connect(msp, mdp)(MainNav);