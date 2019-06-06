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

export const createPost = (formData) => {
    return $.ajax({
        method: 'POST',
        url: 'api/posts/',
        data: formData,
        contentType: false,
        processData: false
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