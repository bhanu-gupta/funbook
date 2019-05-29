import { RECEIVE_LOGIN_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../actions/auth_actions';

export default (state = [], action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_LOGIN_ERRORS:
            newState = state.concat(action.errors);
            return newState;
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};