import React from 'react';
import FriendsIndexItem from './friends_index_item';
import {Link} from 'react-router-dom';
import PageNotFound from '../page_not_found';

class FriendsIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.fetchUserFriends(this.props.match.params.userId).then(() =>
          this.setState({ loading: false })
        );;
    }

    componentDidUpdate(prevProps) {
        if (this.props.profileId != prevProps.profileId) {
            this.fetchUserFriends(
              this.props.match.params.userId
            ).then(() => this.setState({ loading: false }));;
        }
    }

    fetchUserFriends(userId) {
        if (this.props.currentUser.id === userId) {
            return this.props.fetchMyFriends();
        } else {
            return this.props.fetchFriendsFriends(userId);
        }
    }

    render() {
        const all_friends = this.props.friends.map((friend, idx) => {
            return <FriendsIndexItem key={idx} friend={friend} currentUser={this.props.currentUser}/>
        });
        let friendButtons = "";
        const {currentUser, profileId} = this.props;
        if(currentUser.friendIds.includes(profileId)) {
            friendButtons = <button>Friends</button>;
        } else if(currentUser.id == profileId) {
            friendButtons = (
                <Link to={`/friends/requests`}>Friend Requests</Link>
            );
        }
        return (
            <>
                {this.props.friends ? (
                    <section className="friends-section">
                        <div className="friends-header">
                            <div className="heading">
                                <i className="fas fa-user-friends fa-sm friend-icon fa-lg"></i>
                                <h1>Friends</h1>
                            </div>
                            {friendButtons}
                        </div>
                        <ul className="friend-boxes">
                            {this.state.loading === false ? (all_friends.length > 0 ? all_friends : <div className="no-content">No Friends to Show</div>) : ""}
                        </ul>
                    </section>
                ) : ""}
            </>
        );
    }
}

export default FriendsIndex;