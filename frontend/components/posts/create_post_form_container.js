import {connect} from 'react-redux';
import CreatePostForm from './create_post_form';
import {createPost} from '../../actions/posts_actions';
import {withRouter} from 'react-router-dom';
import {openModal, closeModal} from '../../actions/modal_actions';

const msp = (state, ownProps) => {
    const profileId = ownProps.match.params.userId || state.session.currentUserId;
    return {
        currentUser: state.entities.users[state.session.currentUserId],
        modalOpen: state.ui.modal,
        profileId
    }
}

const mdp = dispatch => {
    return {
        createPost: (postForm) => dispatch(createPost(postForm)),
        openModal: () => dispatch(openModal('create-post')),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(msp, mdp)(CreatePostForm));