
export const createComment = (commentForm) => {
    return $.ajax({
        method: 'POST',
        url: 'api/comments/',
        data: {
            comment: commentForm
        }
    });
}

export const updateComment = (commentForm) => {
    const { body, commentId } = commentForm;
    return $.ajax({
        method: 'PATCH',
        url: `api/comments/${commentId}`,
        data: {
            comment: {
                body: body
            }
        }
    })
}

export const deleteComment = (commentId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/comments/${commentId}`
    });
} 