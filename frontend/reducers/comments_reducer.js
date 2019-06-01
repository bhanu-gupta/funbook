import { RECEIVE_COMMENTS } from '../actions/posts_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return merge({}, state, action.comments)
        default:
            return state;
    }
};