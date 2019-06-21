import * as FriendsAPIUtil from '../util/friends_api_util';
import {receiveUsers} from '../actions/auth_actions';
import {merge} from 'lodash';

export const RECEIVE_FRIEND_REQUEST_ERRORS = 'RECEIVE_FRIEND_REQUEST_ERRORS';
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';

const receiveFriendRequestErrors = (errors) => {
    return {
        type: RECEIVE_FRIEND_REQUEST_ERRORS,
        errors
    }
}

const receiveFriends = (friends) => {
    return {
        type: RECEIVE_FRIENDS,
        friends
    }
}

export const fetchFriendsfriends = (userId) => {
    return dispatch => {
        return FriendsAPIUtil.fetchFriendsfriends(userId).then(
            (userData) => {
                const { friends, user } = userData;
                const allUsers = user ? merge({}, friends, { [user.id]: user }) : friends;
                return dispatch(receiveUsers(allUsers));
            }
        );
    }
}

export const fetchMyFriends = () => {
    return dispatch => {
        return FriendsAPIUtil.fetchMyFriends().then(
            (userData) => {
                const { friends, user } = userData;
                const allUsers = user ? merge({}, friends, { [user.id]: user }) : friends;
                return dispatch(receiveUsers(allUsers));
            }
        );
    }
}

export const fetchFriendRequestsData = () => {
    return (dispatch) => {
        return FriendsAPIUtil.fetchFriendRequestsData().then(
            (userData) => {
                const { friends, user } = userData;
                const allUsers = user ? merge({}, friends, { [user.id]: user }): friends;
                return dispatch(receiveUsers(allUsers));
            }
        );
    };
}

export const sendFriendRequest = (receiverId) => {
    return dispatch => {
        return FriendsAPIUtil.sendFriendRequest(receiverId).then(
            (response) => dispatch(receiveFriends(response.friends)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}

export const acceptFriendRequest = (requestorId) => {
    return dispatch => {
        return FriendsAPIUtil.acceptFriendRequest(requestorId).then(
            (response) => dispatch(receiveFriends(response.friends)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}

export const removeFriend = (requestorId) => {
    return dispatch => {
        return FriendsAPIUtil.removeFriendRequest(requestorId).then(
            (response) => dispatch(receiveFriends(response.friends)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}
