import React from 'react';
import FriendshipButtonsContainer from '../friends/friendship_buttons_container';
import {Link} from 'react-router-dom';

class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        const { profilePhoto = null, coverPhoto = null} = props;
        this.state = {
            profile_photo: {
                url: profilePhoto,
                file: null
            },
            cover_photo: {
                url: coverPhoto,
                file: null
            }
        };
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            const { profilePhoto = null, coverPhoto = null } = this.props;
            this.setState({
                profile_photo: {
                    url: profilePhoto,
                    file: null
                },
                cover_photo: {
                    url: coverPhoto,
                    file: null
                }
            })
        }
    }

    handleFile(field) {
        return (e) => {
            const file = e.currentTarget.files[0];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({ [field]: {file: file, url: fileReader.result }});
                const formData = new FormData();
                if (file) {
                    formData.append(`user[${field}]`, file);
                    this.props.updateUserInfo(formData);
                }
            };
            if (file) {
                fileReader.readAsDataURL(file);
            }
        }
    }

    render() {
        const urlPath = this.props.location.pathname;
        const { profileInfo, currentUser } = this.props;
        const profile_preview = this.state.profile_photo.url ? this.state.profile_photo.url : (profileInfo ? profileInfo.profilePhoto : null);
        const cover_preview = this.state.cover_photo.url ? this.state.cover_photo.url : (profileInfo ? profileInfo.coverPhoto : null);
        return profileInfo ?  (
            <section className="profile-header">
                <div className="profile-header-main">
                    <img className="cover-pic" src={cover_preview} alt=""/>
                    <div>
                        {profileInfo.id === currentUser.id ? (
                        <div className="cover-pic-upload camera-icon">
                                <i className="fas fa-camera photo-icon fa-2x" onClick={() => document.getElementById("cover_photo").click()}>
                                    <input type="file" id="cover_photo" onChange={this.handleFile('cover_photo')} />
                                </i>
                        </div>
                        ) : ""}
                        <figure className="photo-box">
                            <a>
                                <img className="profile-pic" src={profile_preview ? profile_preview : window.defaultUser} />
                            </a>
                        </figure>
                        {profileInfo.id === currentUser.id ? (
                            <>
                            <input type="file" id="profile_photo" onChange={this.handleFile('profile_photo')} />
                            <a className="add-photo" onClick={() => document.getElementById("profile_photo").click()}>
                                <div className="photo-container camera-icon">
                                    <i className="fas fa-camera photo-icon fa-2x"></i>
                                    <span>Update Photo</span>
                                </div>
                            </a>
                            </>
                        ) : ""}
                    </div>
                    <span className="user-name">{`${profileInfo.firstName} ${profileInfo.lastName}`}</span>
                    <FriendshipButtonsContainer profileId={profileInfo.id} currentUser={currentUser}/>
                </div>
                <div className="profile-header-menu">
                    <ul>
                        <li className={urlPath.match(/timeline/i) ? "menu-selected" : ""}><Link to={`/users/${profileInfo.id}/timeline`}>Timeline</Link></li>
                        {/* <li>About</li> */}
                        <li className={urlPath.match(/friends/i) ? "menu-selected" : ""}>
                            <Link to={`/users/${profileInfo.id}/friends`}>Friends 
                                <span className="friend-count">
                                        {profileInfo.friendIds ? profileInfo.friendIds.length : ""}
                                </span>
                            </Link>
                        </li>
                        <li className={urlPath.match(/photos/i) ? "menu-selected" : ""}>
                            <Link to={`/users/${profileInfo.id}/photos`}>Photos</Link>
                        </li>
                        {/* <li>Archive</li>
                        <li>More</li> */}
                    </ul>
                </div>
            </section>
        ) : '';
    }


}

export default ProfileHeader;