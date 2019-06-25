import * as PostsAPIUtil from '../util/posts_api_util';
import { receiveUsers } from '../actions/auth_actions';
import {receiveComments} from './comments_actions';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

const receivePost = (post, newPost = false) => {
    return {
        type: RECEIVE_POST,
        post,
        newPost
    }
}

const removePost = (post) => {
    return {
        type: REMOVE_POST,
        post
    }
}

const receivePostErrors = (errors) => {
    return {
        type: RECEIVE_POST_ERRORS,
        errors
    }
}

const handleFetchProfilePosts = (postsData, dispatch) => {
    const {posts, comments, users} = postsData;
    if (posts) dispatch(receivePosts(posts));
    if (users) dispatch(receiveUsers(users));
    if (comments) dispatch(receiveComments(comments));
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const fetchMyPosts = () => {
    return dispatch => {
        return PostsAPIUtil.fetchMyPosts().then(
            (postsData) => handleFetchProfilePosts(postsData, dispatch)
        );
    }
}

export const fetchFriendPosts = (userId) => {
    return dispatch => {
        return PostsAPIUtil.fetchFriendPosts(userId).then(
            (postsData) => handleFetchProfilePosts(postsData, dispatch)
        );
    }
}

export const createPost = (postForm) => {
    return dispatch => {
        return PostsAPIUtil.createPost(postForm).then(
            (post) => dispatch(receivePost(post, true)),
            (errors) => dispatch(receivePostErrors(errors.responseJSON))
        );
    }
}

export const updatePost = (postForm, postId) => {
    return dispatch => {
        return PostsAPIUtil.updatePost(postForm, postId).then(
            (post) => dispatch(receivePost(post)),
            (errors) => dispatch(receivePostErrors(errors.responseJSON))
        );
    }
}

export const deletePost = (postId) => {
    return dispatch => {
        return PostsAPIUtil.deletePost(postId).then(
            (post) => dispatch(removePost(post)),
            (errors) => dispatch(receivePostErrors(errors.responseJSON))
        );
    }
}
