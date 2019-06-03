import React from 'react';
import FriendsIndexItem from './friends_index_item';
import MainNavContainer from '../main_nav_container';

class FriendRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'received'
        }
        this.toggleRequestType = this.toggleRequestType.bind(this);
    }

    componentDidMount() {
        this.props.fetchFriendRequestsData();
    }

    // componentDidUpdate() {
    //     debugger;
    // }

    toggleRequestType() {
        if (this.state.type === 'sent') {
            this.setState({type: 'received'});
        } else {
            this.setState({type: 'sent'})
        }
    }

    render() {
        let heading = "";
        let friends = [];
        let linkTxt = "";
        const { sentFriends, receivedFriends} = this.props;
        if (this.state.type === 'sent') {
            heading = sentFriends.length === 0 ? 'No Sent Friend Requests' : 'Friend Requests Sent';
            friends = sentFriends;
            linkTxt = 'View Received Requests';
        } else {
            heading = receivedFriends.length === 0 ? 'No Received Friend Requests' : `Respond to Your ${receivedFriends.length} Friend Requests`;
            friends = receivedFriends;
            linkTxt = 'View Sent Requests';
        }
        const all_friends = friends.map((friend, idx) => {
            return <FriendsIndexItem key={idx} friend={friend} currentUser={this.props.currentUser} />
        });
        return (
            <>
            <MainNavContainer />
                <div className="main-content profile-main">
                <div className="profile-content pdng-20">
                    <section className="friend-requests">
                        <header>
                            <h1>{heading}</h1>
                            <a><span onClick={this.toggleRequestType}>{linkTxt}</span></a>
                        </header>
                        <ul className="friend-boxes">
                            {all_friends}
                        </ul>
                    </section>
                </div>
            </div>
            </>
        );
    }
}

export default FriendRequests;