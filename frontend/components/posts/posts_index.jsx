import React from 'react';
import PostsIndexItemContainer from './posts_index_item_container';

class PostsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchProfilePosts(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.profileId != prevProps.profileId) {
            this.fetchProfilePosts(this.props.match.params.userId);
        }
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
            return <PostsIndexItemContainer key={idx} post={post} isFriend={this.props.isFriend}/>;
        });
        return (
                <ul className="all-posts">
                    {allPosts}
                </ul>
        );
    }
}

export default PostsIndex;