import React from 'react';
import FriendshipButtonContainer from './friendship_buttons_container';
import {Link} from 'react-router-dom';

const FriendsIndexItem = ({friend, currentUser}) => {
    return (
        <li>
            <figure className="profile-img">
                <Link to={`/users/${friend.id}`}>
                    <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320a/p320x320/59879565_2633165793364506_8537714378160472064_n.jpg?_nc_cat=103&_nc_ht=scontent-lga3-1.xx&oh=25d24516e30adec17f73daa2466d4507&oe=5D5203EC" />
                </Link>
            </figure>
            <div className="friend-info">
                <Link to={`/users/${friend.id}`}>
                    <span className="friend-name">{`${friend.firstName} ${friend.lastName}`}</span>
                </Link>
                <Link to={`/users/${friend.id}/friends`}>
                    <span>{`${friend.friendIds.length} friends`}</span>
                </Link>
            </div>
            <FriendshipButtonContainer profileId={friend.id} currentUser={currentUser}/>
        </li>
    );
}

export default FriendsIndexItem;