import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/auth_actions';
import {RECEIVE_USERS} from '../actions/posts_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case LOGOUT_CURRENT_USER:
            return {};
        case RECEIVE_USERS:
            return merge({}, state, action.users)
        default:
            return state;
    }
};