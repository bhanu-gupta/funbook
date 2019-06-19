import { connect } from 'react-redux';
import CommentsIndexItem from './comments_index_item';
import {deleteComment} from '../../actions/comments_actions';
import {withRouter} from 'react-router-dom';

const msp = (state, ownProps) => {
    const authorId = ownProps.comment ? (ownProps.comment.authorId) : null;
    const currentUserId = state.session.currentUserId;
    const profileId = ownProps.match.params.userId || null;
    return {
        author: state.entities.users[authorId] || {},
        comment: ownProps.comment || {},
        currentUserId,
        profileId,
        isFriend: ownProps.isFriend
    }
}

const mdp = dispatch => {
    return {
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default withRouter(connect(msp, mdp)(CommentsIndexItem));