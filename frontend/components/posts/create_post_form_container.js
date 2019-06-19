import {connect} from 'react-redux';
import CreatePostForm from './create_post_form';
import {createPost} from '../../actions/posts_actions';
import {withRouter} from 'react-router-dom';

const msp = (state, ownProps) => {
    const currentUserId = state.session.currentUserId;
    const currentUser = state.entities.users[currentUserId];
    const profileId = ownProps.match.params.userId || currentUserId;
    return {
        currentUser: ownProps.currentUser || currentUser,
        profileId,
        profileInfo: state.entities.users[profileId] || currentUser
    }   
}

const mdp = dispatch => {
    return {
        createPost: (postForm) => dispatch(createPost(postForm))
    }
}

export default withRouter(connect(msp, mdp)(CreatePostForm));