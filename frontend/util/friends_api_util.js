export const fetchFriendsfriends = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${userId}/friends`
    });
};

export const fetchMyFriends = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/friends'
    });
}

export const sendFriendRequest = (receiverId) => {
    return $.ajax({
        method: 'POST',
        url: `api/users/${receiverId}/friends`
    });
}

export const acceptFriendRequest = (requestorId) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/users/${requestorId}/friends`
    });
}

export const removeFriendRequest = (requestorId) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/users/${requestorId}/friends`
    });
} 

export const fetchFriendRequestsData = () => {
    return $.ajax({
        method: 'GET',
        url: `/api/friends`,
        data: {
            type: 'requests'
        }
    })
} 