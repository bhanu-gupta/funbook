import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/auth_actions';
import {RECEIVE_USERS} from '../actions/auth_actions';
import {RECEIVE_POST, REMOVE_POST} from '../actions/posts_actions';
import { ACCEPT_FRIEND_REQUEST, SEND_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST} from '../actions/friends_actions';
import { merge } from 'lodash';
import { removeValueFromArray} from '../util/helper_util';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_USERS:
            return merge({}, state, action.users)
        case RECEIVE_POST:
            if (action.newPost) {
                const userId = action.post.userId;
                return merge({}, state, {[userId]:{
                    postIds: [action.post.id].concat(state[userId].postIds)
                }});
            }
        case REMOVE_POST:
            const userId = action.post.userId;
            const postIds = removeValueFromArray(state[userId].postIds, action.post.id);
            return merge({}, state, {
                [userId]: {
                    postIds
                }
            });
        case ACCEPT_FRIEND_REQUEST:
             //add to current user friendIds
             //add to requestor friendIds
             //remove from current user receivedFriendIds
            const { requestorId, receiverId } = action.friendReq;
            return merge({}, state, {
                [receiverId]: {
                    friendIds: [requestorId].concat(state[receiverId].friendIds),
                    receivedFriendIds: removeValueFromArray(state[receiverId].sentFriendIds, requestorId)
                },
                [requestorId]: {
                    friendIds: [receiverId].concat(state[requestorId].friendIds)
                }
            });
        case SEND_FRIEND_REQUEST:
            //add to currentUser sentFriendIDs
            return merge({}, state, {
                [action.friendReq.requestorId]: {
                    sentFriendIds: [action.friendReq.receiverId].concat(state[action.friendReq.requestorId].sentFriendIds)
                }
            });
        case REMOVE_FRIEND_REQUEST:
            //remove from current user received friend ids
            //remove from requestor/receiver friend ids
            const reqId = action.friendReq.requestorId;
            const recId = action.friendReq.receiverId;
            return merge({}, state, {
                [recId]: {
                    friendIds: removeValueFromArray(state[reqId].friendIds, reqId),
                    receivedFriendIds: removeValueFromArray(state[recId].sentFriendIds, reqId)
                },
                [reqId]: {
                    friendIds: removeValueFromArray(state[reqId].friendIds, recId)
                }
            });
        default:
            return state;
    }
};