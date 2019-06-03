import {connect} from 'react-redux';
import FriendsIndex from './friends_index';
import {fetchFriendsfriends, fetchMyFriends} from '../../actions/friends_actions';
import {getUserFriends} from '../../reducers/selector';

const msp = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId];
    const profileId = ownProps.match.params.userId || currentUser.id;
    return {
        currentUser,
        friends: getUserFriends(state, profileId) || {},
        profileId
    }
};

const mdp = (dispatch) => {
    return {
        fetchMyFriends: (profileId) => dispatch(fetchFriendsfriends(profileId)),
        fetchFriendsFriends: (profileId) => dispatch(fetchFriendsfriends(profileId))
    }
};

export default connect(msp, mdp)(FriendsIndex);