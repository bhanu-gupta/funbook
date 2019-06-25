import {connect} from 'react-redux';
import PostsIndexItem from './posts_index_item';
import {getAllPostComments} from "../../reducers/selector";
import {isEmpty} from 'lodash';
import {deletePost} from '../../actions/posts_actions';

const msp = (state, ownProps) => {
    const currentUserId = state.session.currentUserId;
    const profileId = ownProps.profileInfo ? ownProps.profileInfo.id : currentUserId;
    const authorId = ownProps.post.authorId || profileId;
    const userId = ownProps.post.userId || profileId;
    const postId = ownProps.post.id || null;
    return {
        author: state.entities.users[authorId] || {},
        user: state.entities.users[userId] || {},
        comments: (isEmpty(state.entities.comments)) ? {} : postId ? (getAllPostComments(state, ownProps.post.id)) : {},
        totalComments: postId ? state.entities.posts[postId].commentIds.length : 0,
        isFriend: ownProps.isFriend,
        currentUserId
    }
}

const mdp = dispatch => {
    return {
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(msp, mdp)(PostsIndexItem);