export const fetchFriendPosts = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${userId}/posts`
    });
};

export const fetchMyPosts = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/posts'
    });
}

export const createPost = (postForm) => {
    const {body, userId} = postForm;
    return $.ajax({
        method: 'POST',
        url: 'api/posts/',
        data: {
            post: {
                body: body,
                user_id: userId
            }
        }
    });
}

export const updatePost = (postForm) => {
    const { body, postId } = postForm;
    return $.ajax({
        method: 'PATCH',
        url: `api/posts/${postId}`,
        data: {
            post: {
                body: body
            }
        }
    })
}

export const deletePost = (postId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/posts/${postId}`
    });
} 