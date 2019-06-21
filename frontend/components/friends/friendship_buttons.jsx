import React from 'react';
import {Link} from 'react-router-dom';

class FriendshipButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonType: this.getButtonType()
        }
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this._isMounted = true;
        this.buttons = {
            default: "",
            friend: (
                <>
                    <button>
                        <i className="fas fa-check"></i>
                        <span>Friends</span>
                    </button>
                    <ul className="bottom-dropdown friend-dropdown">
                        <li onClick={this.removeFriend}>Unfriend</li>
                    </ul>
                </>
            ),
            addFriend: (
                    <button onClick={this.sendFriendRequest}>
                        <i className="fas fa-user-plus"></i>
                        <span>Add Friend</span>
                    </button>
            ),
            sentFriend: (
                <>
                    <button>
                        <i className="fas fa-user-plus"></i>
                        <span>Friend Request Sent</span>
                    </button>
                    <ul className="bottom-dropdown friend-dropdown">
                        <li onClick={this.removeFriend}>Cancel Request</li>
                    </ul>
                </>
            ),
            receivedFriend: (
                <>
                    <button>
                        <i className="fas fa-user-plus"></i>
                        <span>Respond to Friend Request</span>
                    </button>
                    <ul className="bottom-dropdown friend-dropdown">
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

    updateButton(button) {
        if (this._isMounted === true) {
            this.setState({ buttonType: button });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendFriendRequest(e) {
        this.props.sendFriendRequest(this.props.profileId)
            .then(() => this.updateButton('sentFriend'));
    }

    addFriend(e) {
        this.props.addFriend(this.props.profileId)
            .then(() => this.updateButton('friend'));
    }

    removeFriend(e) {
        this.props.removeFriend(this.props.profileId)
            .then(() => this.updateButton('addFriend'));
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