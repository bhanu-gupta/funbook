import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/auth_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
};