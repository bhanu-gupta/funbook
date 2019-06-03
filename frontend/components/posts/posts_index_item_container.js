import {connect} from 'react-redux';
import PostsIndexItem from './posts_index_item';

const msp = (state, ownProps) => {
    const authorId = ownProps.post.authorId;
    const userId = ownProps.post.userId;
    return {
        author: state.entities.users[authorId] || {},
        user: state.entities.users[userId] || {}
    }
}

export default connect(msp)(PostsIndexItem);