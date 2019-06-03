import React from 'react';
import FriendshipButtonsContainer from '../friends/friendship_buttons_container';
import {Link} from 'react-router-dom';

class ProfileHeader extends React.Component {

    render() {
        const { profileInfo, currentUser } = this.props;
        return profileInfo ?  (
            <section className="profile-header">
                <div className="profile-header-main">
                    <img className="cover-pic" src="" alt=""/>
                    <div>
                        {profileInfo.id === currentUser.id ? (
                        <div className="cover-pic-upload camera-icon">
                            <i className="fas fa-camera photo-icon fa-2x"></i>
                        </div>
                        ) : ""}
                        <a>
                            <img className="profile-pic" src="https://media1.mensxp.com/media/content/2018/May/bollywood-actors-trying-their-hand-at-web-series-in-2018-1400x653-1527250022_1100x513.jpg" alt="" />
                        </a>
                        {profileInfo.id === currentUser.id ? (
                            <a className="add-photo">
                                <div className="photo-container camera-icon">
                                    <i className="fas fa-camera photo-icon fa-2x"></i>
                                    <span>Add Photo</span>
                                </div>
                            </a>
                        ) : ""}
                        
                    </div>
                    <span className="user-name">{`${profileInfo.firstName} ${profileInfo.lastName}`}</span>
                    <FriendshipButtonsContainer profileId={profileInfo.id} currentUser={currentUser}/>
                </div>
                <div className="profile-header-menu">
                    <ul>
                        <li><Link to={`/users/${profileInfo.id}/timeline`}>Timeline</Link></li>
                        {/* <li>About</li> */}
                        <li><Link to={`/users/${profileInfo.id}/friends`}>Friends</Link></li>
                        <li><Link to={`/users/${profileInfo.id}/photos`}>Photos</Link></li>
                        {/* <li>Archive</li>
                        <li>More</li> */}
                    </ul>
                </div>
            </section>
        ) : '';
    }


}

export default ProfileHeader;