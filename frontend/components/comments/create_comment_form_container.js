import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { createComment } from '../../actions/comments_actions';

const msp = (state, ownProps) => {
    const comment = { postId: ownProps.postId || null, parentId: ownProps.parentId || null}
    return {
        currentUser: state.entities.users[state.session.currentUserId],
        comment,
        formType: ownProps.formType || "create",
        commentType: ownProps.type || 'comment'
    }
}

const mdp = dispatch => {
    return {
        processForm: (commentForm) => dispatch(createComment(commentForm))
    }
}

export default connect(msp, mdp)(CommentForm);