import {merge, invert} from 'lodash';

export const getAllProfilePosts = (state, profileId) => {
    let allPosts = [];
    debugger;
    const ownPostIds = state.entities.users[profileId].postIds || [];
    const userFriendIds = state.entities.users[profileId].friendIds || [];
    let friendPostIds = {};
    if (userFriendIds) {
        userFriendIds.forEach((friendId) => {
            allfriendPostIds = state.entities.users[friendId].postIds;
            allfriendPostIds.forEach((postId) => {
                if (state.entities.posts[postId].userId === profileId) {
                    friendPostIds[postId] = {};
                }
            });
        });
    }
    if(ownPostIds) {
        let  ownPostsObj = invert(Object.assign({}, ownPostIds));
        const allPostIds = merge(ownPostsObj, friendPostIds);
        if (allPostIds.keys) {
            allPostIds.keys.forEach((postId) => {
                const postInfo = state.entities.posts[postId];
                if (postInfo) {
                    allPosts.push(postInfo);
                }
            });
        }
    }
    return allPosts;
};