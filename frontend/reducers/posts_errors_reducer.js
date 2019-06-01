import { RECEIVE_POST_ERRORS, RECEIVE_POST, CLEAR_ERRORS} from '../actions/posts_actions';

export default (state=[], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return state.concat(action.errors);
        case RECEIVE_POST:
            return [];
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }
};
