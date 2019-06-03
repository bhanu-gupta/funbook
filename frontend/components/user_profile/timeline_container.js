import { connect } from 'react-redux';
import Timeline from './timeline';
import { withRouter } from 'react-router-dom';
import { getTopUserFriends } from '../../reducers/selector';
import {fetchTimelineData} from '../../actions/auth_actions';

const msp = (state, ownProps) => {
    const currentUserId = state.session.currentUserId;
    const profileId = ownProps.match.params.userId || currentUserId;
    return {
        friends: getTopUserFriends(state, profileId),
        currentUser: state.entities.users[currentUserId],
        profileInfo: state.entities.users[profileId],
    }
};

const mdp = (dispatch) => {
    return {
        fetchTimelineData: (profileId) => dispatch(fetchTimelineData(profileId)),
    }
};

export default withRouter(connect(msp, mdp)(Timeline));