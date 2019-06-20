import {RECEIVE_POST, RECEIVE_POSTS, REMOVE_POST} from '../actions/posts_actions';
import {merge} from 'lodash';
import { REMOVE_COMMENT, RECEIVE_COMMENT } from '../actions/comments_actions';
import { removeValueFromArray } from '../util/helper_util';

export default (state = {}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);
    switch (action.type) {
        case RECEIVE_POSTS:
            return merge({}, state, action.posts)
        case RECEIVE_POST:
            if (newState[action.post.id]) {
                delete newState[action.post.id];
            }
            return merge({}, newState, {[action.post.id]: action.post})
        case REMOVE_POST:
            delete newState[action.post.id];
            return newState;
        case RECEIVE_COMMENT:
            if (action.newComment) {
                const postId = action.comment.postId;
                return merge({}, state, {
                    [postId]: {
                        commentIds: (state[postId].commentIds).concat([action.comment.id])
                    }
                });
            }
        case REMOVE_COMMENT:
            const postId = action.comment.postId;
            const commentIds = removeValueFromArray(state[postId].commentIds, action.comment.id);
            return merge({}, state, {
                [postId]: {
                    commentIds
                }
            });
        default:
            return state;
    }
};