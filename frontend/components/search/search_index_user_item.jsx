import React from "react";
import FriendshipButtonContainer from "../friends/friendship_buttons_container";
import { Link } from "react-router-dom";

const SearchIndexUserItem = ({ user, currentUser }) => {
  return (
    <li>
      <figure className="profile-img">
        <Link to={`/users/${user.id}`}>
          <img
            src={user.profilePhoto ? user.profilePhoto : window.defaultUser}
          />
        </Link>
      </figure>
      <div className="friend-info">
        <Link to={`/users/${user.id}`}>
          <span className="friend-name">
            {`${user.firstName} ${user.lastName}`}
          </span>
        </Link>
      </div>
      <FriendshipButtonContainer
        profileId={user.id}
        currentUser={currentUser}
      />
    </li>
  );
};

export default SearchIndexUserItem;
