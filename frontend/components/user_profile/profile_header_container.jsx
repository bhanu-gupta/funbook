import { connect } from 'react-redux';
import ProfileHeader from './profile_header';
import {withRouter} from 'react-router-dom';
import {updateUserInfo} from '../../actions/auth_actions';

const msp = (state, ownProps) => {
    const currentUserId = state.session.currentUserId;
    const profileId = ownProps.match.params.userId || currentUserId;
    return {
        profileInfo: state.entities.users[profileId],
        currentUser: state.entities.users[currentUserId]
    }
};

const mdp = (dispatch) => {
    return {
        updateUserInfo: (formData) => dispatch(updateUserInfo(formData)),
    }
}
export default withRouter(connect(msp, mdp)(ProfileHeader));