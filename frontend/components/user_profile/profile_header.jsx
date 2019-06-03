import React from 'react';
import FriendshipButtonsContainer from '../friends/friendship_buttons_container';

class ProfileHeader extends React.Component {

    render() {
        const { profileInfo, currentUser } = this.props;
        return profileInfo ?  (
            <section className="profile-header">
                <div className="profile-header-main">
                    <img className="cover-pic" src="" alt=""/>
                    <img className="profile-pic" src="" alt="" />
                    <span>{`${profileInfo.firstName} ${profileInfo.lastName}`}</span>
                    <FriendshipButtonsContainer profileId={profileInfo.id} currentUser={currentUser}/>
                </div>
                <div className="profile-header-menu">
                    <ul>
                        <li>Timeline</li>
                        <li>About</li>
                        <li>Friends</li>
                        <li>Photos</li>
                        <li>Archive</li>
                        <li>More</li>
                    </ul>
                </div>
            </section>
        ) : '';
    }


}

export default ProfileHeader;