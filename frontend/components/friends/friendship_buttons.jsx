import React from 'react';

class FriendshipButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonType: this.getButtonType()
        }
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this.buttons = {
            default: "",
            friend: (
                <>
                    <button>Friends</button>
                    <ul className="friend-dropdown">
                        <li onClick={this.removeFriend}>Unfriend</li>
                    </ul>
                </>
            ),
            addFriend: (
                    <button onClick={this.sendFriendRequest}>Add Friend</button>
            ),
            sentFriend: (
                <>
                    <button>Friend Request Sent</button>
                    <ul className="friend-dropdown">
                        <li onClick={this.removeFriend}>Cancel Request</li>
                    </ul>
                </>
            ),
            receivedFriend: (
                <>
                    <button>Respond to Friend Request</button>
                    <ul className="friend-dropdown">
                        <li onClick={this.addFriend}>Confirm</li>
                        <li onClick={this.removeFriend}>Delete Request</li>
                    </ul>
                </>
            )
        }
    }

    getButtonType() {
        const { profileId, currentUser } = this.props;
        let buttonType = 'default';
        if (currentUser.id != profileId) {
            if (currentUser.friendIds.includes(profileId)) {
                buttonType = 'friend';
            } else if (currentUser.sentFriendIds.includes(profileId)) {
                buttonType = 'sentFriend';
            } else if (currentUser.receivedFriendIds.includes(profileId)) {
                buttonType = 'receivedFriend';
            } else {
                buttonType = 'addFriend';
            }
        }
        return buttonType;
    }

    componentDidUpdate(prevProps) {
        if (this.props.profileId != prevProps.profileId) {
            this.setState({ buttonType: this.getButtonType() })
        }
    }

    sendFriendRequest(e) {
        this.props.sendFriendRequest(this.props.profileId)
        .then(() => this.setState({ buttonType: 'sentFriend' }));
    }

    addFriend(e) {
        this.props.addFriend(this.props.profileId)
            .then(() => this.setState({ buttonType: 'friend' }));
    }

    removeFriend(e) {
        this.props.removeFriend(this.props.profileId)
            .then(() => this.setState({ buttonType: 'addFriend' }));
    }

    render() {
        return (
            <div className="header-buttons">
                {this.buttons[this.state.buttonType]}
            </div>
        )
    }
}

export default FriendshipButtons;