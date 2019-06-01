import {connect} from 'react-redux';
import CreatePostForm from './create_post_form';
import {createPost} from '../../actions/posts_actions';
import {withRouter} from 'react-router-dom';

const msp = state => {
    return {
        currentUser: state.entities.users[state.session.currentUserId]
    }
}

const mdp = dispatch => {
    return {
        createPost: (postForm) => {
            dispatch(createPost(postForm))
        }
    }
}

export default withRouter(connect(msp, mdp)(CreatePostForm));