import { connect } from 'react-redux';
import CommentsIndexItem from './comments_index_item';
import {deleteComment} from '../../actions/comments_actions';

const msp = (state, ownProps) => {
    const authorId = ownProps.comment ? (ownProps.comment.authorId) : null;
    const currentUserId = state.session.currentUserId;
    return {
        author: state.entities.users[authorId] || {},
        comment: ownProps.comment || {},
        currentUser: state.entities.users[currentUserId],
        isFriend: ownProps.isFriend
    }
}

const mdp = dispatch => {
    return {
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default connect(msp, mdp)(CommentsIndexItem);