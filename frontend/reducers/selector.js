import {getUniqueArrayValues} from '../util/helper_util';
 
export const getAllProfilePosts = (state, profileId) => {
    let timelinePostIds = state.entities.users[profileId].postIds || [];
    const posts = [];
    if (timelinePostIds.length > 0 && state.entities.posts) {
        timelinePostIds.forEach((id) => {
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
    if (friendIds && friendIds.length > 0) {
        if (limit) {
            friendIds = friendIds.slice(0,9);
        }
        friendIds = getUniqueArrayValues(friendIds);
        friendIds.forEach((id) => {
            if (state.entities.users[id]) {
               friends.push(state.entities.users[id]);
            }
        });
    }
    return friends;
}

export const getAllPostComments = (state, postId) => {
    let postCommentIds = state.entities.posts[postId].commentIds;
    let comments = {};
    if (postCommentIds.length > 0 && state.entities.comments) {
        postCommentIds.forEach((id) => {
            if (state.entities.comments[id]) {
                const comment = state.entities.comments[id];
                if (!comment.parentId) {
                    if(comments[comment.id]) {
                        comment.subComments = comments[comment.id].subComments;
                    } else {
                        comment.subComments = [];
                    }
                    comments[comment.id] = comment;
                } else {
                    comment.subComments = [];
                    if(state.entities.comments[comment.parentId]) {
                        if (comments[comment.parentId]) {
                            comments[comment.parentId].subComments.push(comment);
                        } else {
                            comments[comment.parentId] = { subComments: [comment] };
                        }
                    }
                }
            }
        })
    }
    return comments;
}