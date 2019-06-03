import React from 'react';
import TopFriends from '../friends/top_friends';
import PostsIndexContainer from '../posts/posts_index_container';
import CreatePostFormContainer from '../posts/create_post_form_container';

class Timeline extends React.Component {

    componentDidMount() {
        const profileId = this.props.match.params.userId || 
            this.props.currentUser.id;
        this.props.fetchTimelineData(profileId);
    }

    componentDidUpdate(prevProps) {
        const profileId = this.props.match.params.userId ||
            this.props.currentUser.id;
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.props.fetchTimelineData(profileId);
        }
    }

    render() {
        return (
            <>
            <TopFriends friends={this.props.friends}/>
            <CreatePostFormContainer />
            {/* <PostsIndexContainer /> */}
            </>
        );
    }
}

export default Timeline;