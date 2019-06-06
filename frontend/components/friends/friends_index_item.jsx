import React from 'react';
import FriendshipButtonContainer from './friendship_buttons_container';
import {Link} from 'react-router-dom';

const FriendsIndexItem = ({friend, currentUser}) => {
    const friendNum = friend.friendIds ? friend.friendIds.length : 0;
    return (
        <li>
            <figure className="profile-img">
                <Link to={`/users/${friend.id}`}>
                    <img src={friend.profilePhoto} />
                </Link>
            </figure>
            <div className="friend-info">
                <Link to={`/users/${friend.id}`}>
                    <span className="friend-name">{`${friend.firstName} ${friend.lastName}`}</span>
                </Link>
                <Link to={`/users/${friend.id}/friends`}>
                    <span>{`${friendNum} friends`}</span>
                </Link>
            </div>
            <FriendshipButtonContainer profileId={friend.id} currentUser={currentUser}/>
        </li>
    );
}

export default FriendsIndexItem;