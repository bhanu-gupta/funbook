import React from 'react';
import PostsIndexItemContainer from './posts_index_item_container';

class PostsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.match.params.userId) {
            this.props.fetchMyPosts(this.props.currentUser.id);
        } else {
            this.props.fetchFriendPosts(this.props.match.params.userId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.profileId != prevProps.profileId) {
            this.props.fetchFriendPosts(this.props.match.params.userId);
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