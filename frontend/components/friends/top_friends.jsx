import React from 'react';
import {Link} from 'react-router-dom';

const TopFriends = ({ friends, profileId}) => {
    const allFriends = friends.map((friend, idx) => {
        return (
            <li key={idx}>
                <Link to={`/users/${friend.id}`}>
                    <img src={friend.profilePhoto ? friend.profilePhoto : window.defaultUser} />
                </Link>
                <span>{friend.firstName}</span>
            </li>
        );
    });
    return (
        <>
        {allFriends.length > 0 ? (
            <section className="sidebar-section top-friends">
            <header>
                <Link to={`/users/${profileId}/friends`}><i className="fas fa-user-friends sidebar-icon friends-icon fa-sm"></i></Link>
                <Link to={`/users/${profileId}/friends`}><h1>Friends</h1></Link>
            </header>
            <ul>
                {allFriends}
            </ul>
        </section>
        ) : ""}
        </>
    );
}

export default TopFriends;