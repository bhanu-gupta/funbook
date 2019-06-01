import {connect} from 'react-redux';
import PostsIndex from './posts_index';
import {fetchMyPosts, fetchFriendPosts} from '../../actions/posts_actions';
import {withRouter} from 'react-router-dom';
import { getAllProfilePosts} from '../../reducers/selector';

const msp = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.currentUserId];
    const profileId = ownProps.match.params.userId || currentUser.id;
    return {
        currentUser,
        posts: getAllProfilePosts(state, profileId) || {}
    }
};

const mdp = (dispatch) => {
    return {
        fetchMyPosts: () => dispatch(fetchMyPosts()),
        fetchFriendPosts: (friendId) => dispatch(fetchFriendPosts(friendId))
    }
};

export default withRouter(connect(msp, mdp)(PostsIndex));