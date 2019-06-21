import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/auth_actions';
import {RECEIVE_USERS} from '../actions/auth_actions';
import {RECEIVE_POST, REMOVE_POST} from '../actions/posts_actions';
import {RECEIVE_FRIENDS} from '../actions/friends_actions';
import { merge } from 'lodash';
import { removeValueFromArray} from '../util/helper_util';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_USERS:
            return merge({}, state, action.users)
        case RECEIVE_FRIENDS:
            Object.keys(action.friends).forEach((userId) => {
                if (newState[userId]) {
                    delete newState[userId];
                }
                newState[userId] = action.friends[userId];
            });
            return newState;
        case RECEIVE_POST:
            if (action.newPost) {
                const userId = action.post.userId;
                return merge({}, state, {[userId]:{
                    postIds: [action.post.id].concat(state[userId].postIds)
                }});
            } else {
                return state;
            }
        case REMOVE_POST:
            const userId = action.post.userId;
            const postIds = removeValueFromArray(state[userId].postIds, action.post.id);
            return merge({}, state, {
                [userId]: {
                    postIds
                }
            });
        default:
            return state;
    }
};