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

export const updatePost = (formData, postId) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/posts/${postId}`,
        data: formData,
        contentType: false,
        processData: false
    })
}

export const deletePost = (postId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/posts/${postId}`
    });
} 