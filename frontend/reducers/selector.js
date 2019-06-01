export const getAllProfilePosts = (state, profileId) => {
    timelinePostIds = state.entities.users[profileId].postIds;
    return timelinePostIds ? timelinePostIds.map(id => state.entities.posts[id]) : [];
};