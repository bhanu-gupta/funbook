import React from 'react';
import TopFriends from '../friends/top_friends';
import PostsIndexContainer from '../posts/posts_index_container';
import CreatePostFormContainer from '../posts/create_post_form_container';
import PageNotFound from  '../page_not_found';
import IntroContainer from './intro_container';
import PostsIndexItemContainer from '../posts/posts_index_item_container';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const profileId = this.props.match.params.userId || 
            this.props.currentUser.id;
        this.props
            .fetchTimelineData(profileId)
            .then(() => this.setState({loading: false}));
    }

    componentDidUpdate(prevProps) {
        const profileId = this.props.match.params.userId ||
            this.props.currentUser.id;
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.props
              .fetchTimelineData(profileId)
              .then(() => this.setState({ loading: false }));
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
                {this.state.loading === false ? (
                    <>
                    {this.props.profileInfo ? (
                        <>
                        <section className="timeline-sidebar">
                            <IntroContainer profileInfo={profileInfo} currentUser={currentUser}/>
                            <TopFriends friends={this.props.friends} profileId={this.props.match.params.userId} />
                        </section>
                        <section className="timeline-posts">
                                {isFriend ? <CreatePostFormContainer profileInfo={profileInfo} currentUser={currentUser}/> : ""}
                            <PostsIndexContainer isFriend={isFriend}/>
                            <PostsIndexItemContainer post={{}} isFriend={isFriend} type="birth" profileInfo={profileInfo}/>
                        </section>
                        </>
                    ): <PageNotFound />}
                    </>
                ) : ""}
                    
                </>
        );
    }
}

export default Timeline;