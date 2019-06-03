import * as FriendsAPIUtil from '../util/friends_api_util';
import {receiveUsers} from '../actions/auth_actions';

export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const RECEIVE_FRIEND_REQUEST_ERRORS = 'RECEIVE_FRIEND_REQUEST_ERRORS';

const receiveFriendRequest = (friendReq) => {
    return {
        type: ACCEPT_FRIEND_REQUEST,
        friendReq
    }
}

const newFriendRequest = (friendReq) => {
    return {
        type: SEND_FRIEND_REQUEST,
        friendReq
    }
}

const removeFriendRequest = (friendReq) => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        friendReq
    }
}

const receiveFriendRequestErrors = (errors) => {
    return {
        type: RECEIVE_FRIEND_REQUEST_ERRORS,
        errors
    }
}

export const fetchFriendsfriends = (userId) => {
    return dispatch => {
        return FriendsAPIUtil.fetchFriendsfriends(userId).then(
            (friends) => dispatch(receiveUsers(friends))
        );
    }
}

export const fetchMyFriends = () => {
    return dispatch => {
        return FriendsAPIUtil.fetchFriendsfriends(userId).then(
            (friends) => dispatch(receiveUsers(friends))
        );
    }
}

export const sendFriendRequest = (receiverId) => {
    return dispatch => {
        return FriendsAPIUtil.sendFriendRequest(receiverId).then(
            (friendReq) => dispatch(newFriendRequest(friendReq)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}

export const acceptFriendRequest = (requestorId) => {
    return dispatch => {
        return FriendsAPIUtil.acceptFriendRequest(requestorId).then(
            (friendReq) => dispatch(receiveFriendRequest(friendReq)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}

export const removeFriend = (requestorId) => {
    return dispatch => {
        return FriendsAPIUtil.removeFriendRequest(requestorId).then(
            (friendReq) => dispatch(removeFriendRequest(friendReq)),
            (errors) => dispatch(receiveFriendRequestErrors(errors.responseJSON))
        );
    }
}
