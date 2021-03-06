import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/auth_actions';
import { merge } from 'lodash';

const _nullSession = { currentUserId: null };

export default (state = _nullSession, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { currentUserId: action.user.id });
        case LOGOUT_CURRENT_USER:
            return merge({}, state, { currentUserId: null });
        default:
            return state;
    }
};