import {RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST} from '../actions/posts_actions';
import {merge} from 'lodash';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_POSTS:
            return merge({}, state, action.posts)
        case RECEIVE_POST:
            return merge({}, state, {[action.post.id]: action.post})
        case REMOVE_POST:
            let newState = merge({}, oldState);
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
};