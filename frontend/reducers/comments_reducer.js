import { RECEIVE_COMMENTS,RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comments_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return merge({}, state, action.comments)
        case RECEIVE_COMMENT:
            return merge({}, state, { [action.comment.id]: action.comment })
        case REMOVE_COMMENT:
            let newState = merge({}, state);
            delete newState[action.comment.id];
            return newState;
        default:
            return state;
    }
};