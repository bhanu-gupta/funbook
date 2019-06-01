import React from 'react';
import PostsIndexItem from './posts_index_item';

class PostsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchProfilePosts(this.props.match.params.user_id);
    }

    fetchProfilePosts(userId) {
        if (this.props.currentUser.id === userId) {
            this.props.fetchMyPosts();
        } else {
            this.props.fetchFriendPosts(userId);
        }
    }

    render() {
        const allPosts = this.props.posts.map(post => {
            return <PostsIndexItem key={post.id} post={post}/>;
        });
        return (
            <ul>
                {allPosts}
            </ul>
        );
    }
}

export default PostsIndex;