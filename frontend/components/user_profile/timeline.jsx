import React from 'react';
import TopFriends from '../friends/top_friends';
import PostsIndexContainer from '../posts/posts_index_container';
import CreatePostFormContainer from '../posts/create_post_form_container';
import PageNotFound from  '../page_not_found';

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
        const {profileInfo, currentUser} = this.props;
        let isFriend = false;
        if (this.props.match.params.userId == currentUser.id) {
            isFriend = true;
        } else if (profileInfo && profileInfo.friendIds && profileInfo.friendIds.includes(currentUser.id)) {
            isFriend = true;
        }
        return (
                <>
                {this.props.profileInfo ? (
                    <>
                    <section className="timeline-sidebar">
                        <TopFriends friends={this.props.friends} profileId={this.props.match.params.userId} />
                    </section>
                    <section className="timeline-posts">
                        {isFriend ? <CreatePostFormContainer profileId={this.props.match.params.userId} /> : ""}
                        <PostsIndexContainer isFriend={isFriend}/>
                    </section>
                    </>
                ): <PageNotFound />}
                    
                </>
        );
    }
}

export default Timeline;