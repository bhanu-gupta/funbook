import {connect} from 'react-redux';
import FriendRequests from './friend_requests';
import { fetchFriendRequestsData} from '../../actions/friends_actions';
import {getUserFriends} from '../../reducers/selector';

const msp = state => {
    const currentUserId = state.session.currentUserId;
    return {
        sentFriends: getUserFriends(state, currentUserId, "sent"),
        receivedFriends: getUserFriends(state, currentUserId, "received"),
        currentUser: state.entities.users[currentUserId]
    }
}

const mdp = dispatch => {
    return {
        fetchFriendRequestsData: () => dispatch(fetchFriendRequestsData()),
    }
}

export default connect(msp, mdp)(FriendRequests);