export const getAllProfilePosts = (state, profileId) => {
    let timelinePostIds = state.entities.users[profileId].postIds || [];
    const posts = [];
    if (timelinePostIds && state.entities.posts.length > 0) {
        timelinePostIds.foreach((id) => {
            if (state.entities.posts[id]) {
                posts.push(state.entities.posts[id]);
            }
        })
    }
    return posts;
};

export const getUserFriends = (state, profileId, type = "accepted", limit = null) => {
    let friends = [];
    let friendIds = [];
    if (state.entities.users[profileId]) {
        switch (type) {
            case "sent":
                friendIds = state.entities.users[profileId].sentFriendIds;
                break;
            case "received":
                friendIds = state.entities.users[profileId].receivedFriendIds;
                break;
            default:
                friendIds = state.entities.users[profileId].friendIds;
                break;
        }
    }
    if(friendIds.length > 0) {
        if (limit) {
            friendIds = friendIds.slice(0,9);
        }
        friendIds.forEach((id) => {
            if (state.entities.users[id]) {
               friends.push(state.entities.users[id]);
            }
        });
    }
    return friends;
}