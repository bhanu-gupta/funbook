import { connect } from 'react-redux';
import EditPostForm from './edit_post_form';
import { updatePost } from '../../actions/posts_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
    const profileId = ownProps.match.params.userId || state.session.currentUserId;
    return {
        currentUser: state.entities.users[state.session.currentUserId],
        profileId,
        post: ownProps.post
    }
}

const mdp = dispatch => {
    return {
        updatePost: (postForm, postId) => dispatch(updatePost(postForm, postId))
    }
}

export default withRouter(connect(msp, mdp)(EditPostForm));