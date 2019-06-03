import React from 'react';
import PostsIndexItemContainer from './posts_index_item_container';

class PostsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchProfilePosts(this.props.match.params.userId);
    }

    fetchProfilePosts(userId) {
        if (this.props.currentUser.id === userId) {
            this.props.fetchMyPosts();
        } else {
            this.props.fetchFriendPosts(userId);
        }
    }

    render() {
        const allPosts = this.props.posts.map((post, idx) => {
            return <PostsIndexItemContainer key={idx} post={post}/>;
        });
        return (
            <ul>
                {allPosts}
            </ul>
        );
    }
}

export default PostsIndex;