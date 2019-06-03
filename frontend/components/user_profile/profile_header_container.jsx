import { connect } from 'react-redux';
import ProfileHeader from './profile_header';
import {withRouter} from 'react-router-dom';

const msp = (state, ownProps) => {
    const currentUserId = state.session.currentUserId;
    const profileId = ownProps.match.params.userId || currentUserId;
    return {
        profileInfo: state.entities.users[profileId],
        currentUser: state.entities.users[currentUserId]
    }
};
export default withRouter(connect(msp)(ProfileHeader));