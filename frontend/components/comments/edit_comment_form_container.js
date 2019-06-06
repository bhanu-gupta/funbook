import { connect } from 'react-redux';
import CommentForm from './comment_form';
import {updateComment } from '../../actions/comments_actions';

const msp = (state, ownProps) => {
    return {
        currentUser: state.entities.users[state.session.currentUserId],
        comment: ownProps.comment || null,
        formType: ownProps.formType || "edit"
    }
}

const mdp = dispatch => {
    return {
        processForm: (commentForm) => dispatch(updateComment(commentForm))
    }
}

export default connect(msp, mdp)(CommentForm);