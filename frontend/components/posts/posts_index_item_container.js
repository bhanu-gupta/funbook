import {connect} from 'react-redux';
import PostsIndexItem from './posts_index_item';
import {getAllPostComments} from "../../reducers/selector";
import {isEmpty} from 'lodash';
import {deletePost} from '../../actions/posts_actions';

const msp = (state, ownProps) => {
    const authorId = ownProps.post.authorId;
    const userId = ownProps.post.userId;
    return {
        author: state.entities.users[authorId] || {},
        user: state.entities.users[userId] || {},
        comments: isEmpty(state.entities.comments) ? {} : (getAllPostComments(state, ownProps.post.id)),
        isFriend: ownProps.isFriend
    }
}

const mdp = dispatch => {
    return {
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(msp, mdp)(PostsIndexItem);