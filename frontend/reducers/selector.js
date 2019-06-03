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

export const getTopUserFriends = (state, profileId) => {
    let friendIds = [];
    if (state.entities.users[profileId]) {
        friendIds = state.entities.users[profileId].friendIds;
    }
    if(friendIds) { 
        friendIds = friendIds.slice(0,9);
        friendIds = friendIds.map((id) => {
            if (state.entities.users[id]) {
                return state.entities.users[id];
            } else {
                return {}
            }
        });
    }
    return friendIds
}