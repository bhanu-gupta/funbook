import React from 'react';
import {Link} from 'react-router-dom';

const TopFriends = ({friends}) => {
    const allFriends = friends.map((friend, idx) => {
        return (
            <li key={idx}>
                <Link to={`/users/${friend.id}`}>
                    <i className="fas fa-user"></i>
                    <span>{friend.firstName}</span>
                </Link>
            </li>
        );
    });
    return (
        <ul>
            {allFriends}
        </ul>
    );
}

export default TopFriends;