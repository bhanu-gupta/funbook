import { connect } from 'react-redux';
import FriendshipButtons from './friendship_buttons';
import { removeFriend, acceptFriendRequest, sendFriendRequest } from '../../actions/friends_actions';

const mdp = (dispatch) => {
    return {
        sendFriendRequest: (receiverId) => dispatch(sendFriendRequest(receiverId)),
        addFriend: (requestorId) => dispatch(acceptFriendRequest(requestorId)),
        removeFriend: (requestorId) => dispatch(removeFriend(requestorId))
    }
};

export default connect(null, mdp)(FriendshipButtons);