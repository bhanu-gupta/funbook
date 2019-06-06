import * as CommentsAPIUtil from '../util/comments_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

const receiveComment = (comment, newComment = false) => {
    return {
        type: RECEIVE_COMMENT,
        comment,
        newComment
    }
}

const removeComment = (comment) => {
    return {
        type: REMOVE_COMMENT,
        comment
    }
}

const receiveCommentErrors = (errors) => {
    return {
        type: RECEIVE_COMMENT_ERRORS,
        errors
    }
}

export const createComment = (commentForm) => {
    return dispatch => {
        return CommentsAPIUtil.createComment(commentForm).then(
            (comment) => dispatch(receiveComment(comment, true)),
            (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
        );
    }
}

export const updateComment = (commentForm) => {
    return dispatch => {
        return CommentsAPIUtil.updateComment(commentForm).then(
            (comment) => dispatch(receiveComment(comment)),
            (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
        );
    }
}

export const deleteComment = (commentId) => {
    return dispatch => {
        return CommentsAPIUtil.deleteComment(commentId).then(
            (comment) => dispatch(removeComment(comment)),
            (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
        );
    }
}
