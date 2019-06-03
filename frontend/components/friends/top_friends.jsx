import React from 'react';
import {Link} from 'react-router-dom';

const TopFriends = ({ friends, profileId}) => {
    const allFriends = friends.map((friend, idx) => {
        return (
            <li key={idx}>
                <Link to={`/users/${friend.id}`}>
                    <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c0.0.320.320a/p320x320/59879565_2633165793364506_8537714378160472064_n.jpg?_nc_cat=103&_nc_ht=scontent-lga3-1.xx&oh=25d24516e30adec17f73daa2466d4507&oe=5D5203EC" />
                </Link>
                <span>{friend.firstName}</span>
            </li>
        );
    });
    return (
        <section className="sidebar-section top-friends">
            <header>
                <Link to={`/users/${profileId}/friends`}><i className="fas fa-user-friends sidebar-icon friends-icon fa-sm"></i></Link>
                <Link to={`/users/${profileId}/friends`}><h1>Friends</h1></Link>
            </header>
            <ul>
                {allFriends}
            </ul>
        </section>
    );
}

export default TopFriends;