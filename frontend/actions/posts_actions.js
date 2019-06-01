import * as PostsAPIUtil from '../util/posts_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post
    }
}

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    }
}

const receivePostErrors = (errors) => {
    return {
        type: RECEIVE_POST_ERRORS,
        errors
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const fetchMyPosts = () => {
    return dispatch => {
        return PostsAPIUtil.fetchMyPosts().then(
            (posts) => dispatch(receivePosts(posts))
        );
    }
}

export const fetchFriendPosts = (userId) => {
    return dispatch => {
        return PostsAPIUtil.fetchFriendPosts(userId).then(
            (posts) => dispatch(receivePosts(posts))
        );
    }
}

export const createPost = (postForm) => {
    return dispatch => {
        return PostsAPIUtil.createPost(postForm).then(
            (post) => dispatch(receivePost(post)),
            (errors) => dispatch(receivePostErrors(errors.responseJSON))
        );
    }
}

export const updatePost = (postForm) => {
    return dispatch => {
        return PostsAPIUtil.updatePost(postForm).then(
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
