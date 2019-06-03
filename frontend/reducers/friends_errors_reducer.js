import { RECEIVE_FRIEND_REQUEST_ERRORS, ACCEPT_FRIEND_REQUEST, SEND_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST } from '../actions/friends_actions';

export default (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FRIEND_REQUEST_ERRORS:
            return state.concat(action.errors);
        case ACCEPT_FRIEND_REQUEST:
            return [];
        case SEND_FRIEND_REQUEST:
            return [];
        case REMOVE_FRIEND_REQUEST:
            return [];
        default:
            return state;
    }
};
