import React from 'react';
import MainNavContainer from '../main_nav_container';
import {Route, Switch} from 'react-router-dom';
import FriendsIndexContainer from '../friends/friends_index_container';
import TimelineContainer from './timeline_container';
import ProfileHeaderContainer from '../user_profile/profile_header_container';
import {ProtectedRoute} from '../../util/route_utils';
import Modal from '../modal';

const UserProfileIndex = () => {
    return (
        <>
            <Modal />
            <MainNavContainer />
            <main className="main-content profile-main">
                <div className="profile-content">
                    <div className="profile-middle">
                        <ProfileHeaderContainer />
                        <div className="profile-data">
                            <Switch>
                                <ProtectedRoute path="/users/:userId/friends" component={FriendsIndexContainer} />
                                <ProtectedRoute exact path="/users/:userId" component={TimelineContainer} />
                                <ProtectedRoute path="/users/:userId/timeline" component={TimelineContainer} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default UserProfileIndex;